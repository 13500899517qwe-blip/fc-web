import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getPayload } from '@/lib/payload'
import type { AppLocale } from '@/i18n/routing'

type Props = { params: Promise<{ locale: string }> }

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('about')

  let body =
    'LumaDrive LED manufactures automotive LED headlights, fog lights, and mounting brackets for global B2B buyers. We support OEM/ODM with stable quality and fast sampling.'

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
      <p className="mt-6 whitespace-pre-wrap leading-relaxed text-zinc-700">{body}</p>
    </div>
  )
}
