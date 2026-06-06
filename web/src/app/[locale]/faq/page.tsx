import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getPayload } from '@/lib/payload'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'
import { Search, ChevronDown, MessageCircle } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

function buildFaq(t: (key: string) => string) {
  return Array.from({ length: 10 }, (_, i) => ({
    question: t(`q${i + 1}`),
    answer: t(`a${i + 1}`),
  }))
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('faq')

  let items = buildFaq(t)

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

  const categories = [
    { id: 'ordering', label: 'Ordering & MOQ', count: 3 },
    { id: 'products', label: 'Products & Quality', count: 3 },
    { id: 'shipping', label: 'Shipping & Payment', count: 4 },
  ]

  return (
    <div className="bg-surface-muted">
      {/* Header */}
      <div className="border-b border-border-light bg-surface py-10">
        <div className="container-main text-center">
          <span className="inline-block rounded-full bg-brand/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand">
            FAQ
          </span>
          <h1 className="mt-3 text-2xl font-bold text-text-primary md:text-3xl">
            {t('title')}
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            {t('subtitle')}
          </p>
        </div>
      </div>

      <div className="container-main py-10">
        <div className="mx-auto max-w-3xl">
          {/* Category filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="rounded-full border border-border-light bg-surface px-4 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-brand hover:text-brand"
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          <dl className="space-y-3">
            {items.map((item, i) => (
              <details
                key={i}
                className="group overflow-hidden rounded-xl border border-border-light bg-surface shadow-card transition-all open:border-brand/30"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-text-primary transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
                  <span className="flex-1">{item.question}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-text-muted transition-transform group-open:rotate-180 group-open:text-brand" />
                </summary>
                <div className="border-t border-border-light px-5 py-4">
                  <p className="text-sm leading-relaxed text-text-secondary">{item.answer}</p>
                </div>
              </details>
            ))}
          </dl>

          {/* Still have questions */}
          <div className="mt-10 text-center">
            <div className="rounded-xl border border-border-light bg-surface p-8 shadow-card">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
                <MessageCircle className="h-6 w-6 text-brand" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-text-primary">{t('contact')}</h2>
              <p className="mt-2 text-sm text-text-secondary">{t('contactDesc')}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/inquiry"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark active:scale-[0.97]"
                >
                  Send Inquiry
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-border-light bg-surface px-6 py-2.5 text-sm font-semibold text-text-primary transition-all hover:border-brand/30 hover:text-brand"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
