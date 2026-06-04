import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPayload } from '@/lib/payload'
import type { AppLocale } from '@/i18n/routing'
import { AddToInquiryButton } from '@/components/inquiry/AddToInquiryButton'

type Props = { params: Promise<{ locale: string }> }

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('home')

  let featured: { id: string; sku: string; title: string; slug: string; summary?: string }[] = []

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'products',
      locale: locale as AppLocale,
      limit: 6,
      where: { featured: { equals: true } },
      depth: 0,
    })
    featured = result.docs.map((doc) => ({
      id: String(doc.id),
      sku: doc.sku as string,
      title: doc.title as string,
      slug: doc.slug as string,
      summary: doc.summary as string | undefined,
    }))
  } catch {
    /* DB not ready */
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-zinc-900 via-blue-950 to-zinc-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">{t('heroTitle')}</h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-300">{t('heroSubtitle')}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
            >
              {t('ctaProducts')}
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white/30 px-6 py-3 font-semibold hover:bg-white/10"
            >
              {t('ctaContact')}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold">{t('featured')}</h2>
        {featured.length === 0 ? (
          <p className="mt-4 text-zinc-600">Run `pnpm seed` after configuring DATABASE_URI.</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <article key={p.id} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                <Link href={`/products/${p.slug}`} className="text-lg font-semibold hover:text-blue-700">
                  {p.title}
                </Link>
                <p className="mt-1 text-sm text-zinc-500">{p.sku}</p>
                {p.summary && <p className="mt-2 text-sm text-zinc-600 line-clamp-2">{p.summary}</p>}
                <div className="mt-4">
                  <AddToInquiryButton sku={p.sku} title={p.title} />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold">{t('advantagesTitle')}</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            <li className="rounded-lg bg-zinc-50 p-4">{t('advantage1')}</li>
            <li className="rounded-lg bg-zinc-50 p-4">{t('advantage2')}</li>
            <li className="rounded-lg bg-zinc-50 p-4">{t('advantage3')}</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
