import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getPayload } from '@/lib/payload'
import type { AppLocale } from '@/i18n/routing'
import { company } from '@/lib/company'

type Props = { params: Promise<{ locale: string }> }

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('about')

  let body: string = company.aboutEn

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'site-content',
      locale: locale as AppLocale,
      where: { key: { equals: 'about' } },
      limit: 1,
    })
    if (result.docs[0]?.body) body = result.docs[0].body as string
  } catch {
    /* default */
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <p className="mt-2 text-sm text-zinc-500">{company.legalName}</p>
      <p className="mt-2 text-sm text-zinc-500">{company.location} · {company.businessType}</p>
      <p className="mt-6 whitespace-pre-wrap leading-relaxed text-zinc-700">{body}</p>
      <dl className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 p-4">
          <dt className="text-sm text-zinc-500">Main categories</dt>
          <dd className="mt-1 font-medium">{company.mainCategories}</dd>
        </div>
        <div className="rounded-lg border border-zinc-200 p-4">
          <dt className="text-sm text-zinc-500">Factory</dt>
          <dd className="mt-1 font-medium">{company.floorspace}</dd>
        </div>
      </dl>
    </div>
  )
}
