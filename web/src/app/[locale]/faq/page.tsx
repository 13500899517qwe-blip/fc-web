import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getPayload } from '@/lib/payload'
import type { AppLocale } from '@/i18n/routing'

type Props = { params: Promise<{ locale: string }> }

const defaultFaq = [
  { question: 'What is your MOQ?', answer: 'Standard MOQ is 50 sets per SKU.' },
  { question: 'Do you provide samples?', answer: 'Yes, samples ship in 3-5 business days.' },
  { question: 'OEM/ODM available?', answer: 'Yes, custom logo and packaging supported.' },
]

export default async function FaqPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('faq')

  let items = defaultFaq

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'site-content',
      locale: locale as AppLocale,
      where: { key: { equals: 'faq' } },
      limit: 1,
      depth: 0,
    })
    const doc = result.docs[0]
    if (doc?.faqItems && Array.isArray(doc.faqItems) && doc.faqItems.length > 0) {
      items = doc.faqItems as { question: string; answer: string }[]
    }
  } catch {
    /* default */
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <dl className="mt-8 space-y-6">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border border-zinc-200 bg-white p-5">
            <dt className="font-semibold">{item.question}</dt>
            <dd className="mt-2 text-zinc-600">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
