import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { runSeedCatalog } from '@/lib/seed-catalog'

/**
 * One-time catalog seed on Vercel (Neon env is only available in the cloud).
 * 1. Set SEED_CATALOG_ENABLED=true in Vercel Production
 * 2. Visit: GET /api/seed-catalog?key=YOUR_PAYLOAD_SECRET&reset=1
 * 3. Remove SEED_CATALOG_ENABLED after success
 */
export async function GET(req: NextRequest) {
  if (process.env.SEED_CATALOG_ENABLED !== 'true') {
    return NextResponse.json({ error: 'SEED_CATALOG_ENABLED is not true' }, { status: 403 })
  }

  const key = req.nextUrl.searchParams.get('key')
  const secret = process.env.PAYLOAD_SECRET
  if (!secret || key !== secret) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 401 })
  }

  const reset = req.nextUrl.searchParams.get('reset') === '1'

  try {
    const payload = await getPayload({ config })
    const result = await runSeedCatalog(payload, { reset, seedProducts: false })
    return NextResponse.json({ ok: true, reset, ...result })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Seed failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
