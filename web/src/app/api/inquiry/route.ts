import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getPayload } from '@/lib/payload'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
  message: z.string().optional(),
  locale: z.string().optional(),
  items: z.array(
    z.object({
      sku: z.string(),
      title: z.string(),
      quantity: z.number().optional(),
    }),
  ),
  turnstileToken: z.string().nullable().optional(),
  contactOnly: z.boolean().optional(),
})

async function verifyTurnstile(token: string | null | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (!token) return false
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  })
  const data = (await res.json()) as { success?: boolean }
  return Boolean(data.success)
}

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json())

    if (!(await verifyTurnstile(body.turnstileToken))) {
      return NextResponse.json({ error: 'Turnstile verification failed' }, { status: 400 })
    }

    const items = body.items.map((i) => ({
      sku: i.sku,
      title: i.title,
      quantity: i.quantity ?? 1,
    }))

    const payload = await getPayload()
    await payload.create({
      collection: 'inquiries',
      data: {
        name: body.name,
        email: body.email,
        company: body.company,
        phone: body.phone,
        country: body.country,
        message: body.message,
        locale: body.locale,
        items,
        turnstileVerified: true,
      },
    })

    // Dual channel: DB (always) + email (when Resend is configured — same code path for 转正).
    const resendKey = process.env.RESEND_API_KEY
    const to = process.env.INQUIRY_TO_EMAIL
    let emailSent = false

    if (resendKey && to) {
      const resend = new Resend(resendKey)
      const lines =
        items.length > 0
          ? items.map((i) => `- ${i.sku} ${i.title} × ${i.quantity}`).join('\n')
          : '(Contact form — no products)'

      await resend.emails.send({
        from: process.env.INQUIRY_FROM_EMAIL || 'onboarding@resend.dev',
        to: [to],
        subject: `New inquiry from ${body.name}`,
        text: [
          `Name: ${body.name}`,
          `Email: ${body.email}`,
          `Company: ${body.company || '-'}`,
          `Phone: ${body.phone || '-'}`,
          `Country: ${body.country || '-'}`,
          `Locale: ${body.locale || '-'}`,
          '',
          'Products:',
          lines,
          '',
          body.message || '',
        ].join('\n'),
      })
      emailSent = true
    } else if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[inquiry] Saved to database. Email skipped — set RESEND_API_KEY and INQUIRY_TO_EMAIL to enable.',
      )
    }

    return NextResponse.json({ ok: true, emailSent })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
