import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPayload } from '@/lib/payload'
import type { AppLocale } from '@/i18n/routing'
import { CatalogEmpty } from '@/components/catalog/CatalogEmpty'
import { AlibabaProductCard } from '@/components/catalog/AlibabaProductCard'
import { findProducts } from '@/lib/catalog-queries'
import { resolveProductImageUrl } from '@/lib/media'
import { alibabaStore } from '@/lib/alibaba-store-data'
import { company } from '@/lib/company'
import { HeroSection } from '@/components/home/HeroSection'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { FactoryShowcase } from '@/components/home/FactoryShowcase'
import { AlibabaProductGroups } from '@/components/home/AlibabaProductGroups'

type Props = { params: Promise<{ locale: string }> }

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('store')

  let products: Awaited<ReturnType<typeof findProducts>>['docs'] = []

  try {
    const payload = await getPayload()
    const featuredResult = await payload.find({
      collection: 'products',
      locale: locale as AppLocale,
      limit: 8,
      where: { featured: { equals: true } },
      depth: 1,
    })
    if (featuredResult.docs.length > 0) {
      products = featuredResult.docs.map((doc) => {
        const image = doc.image as { url?: string } | number | null
        const sku = doc.sku as string
        return {
          id: String(doc.id),
          sku,
          title: doc.title as string,
          slug: doc.slug as string,
          imageUrl: resolveProductImageUrl(image, sku, doc.sourceImageUrl as string | undefined),
          imageAlt: doc.title as string,
        }
      })
    }
  } catch {
    /* DB not ready */
  }

  return (
    <div>
      {/* 1. Hero — brand statement, background carousel, stats */}
      <HeroSection />

      {/* 2. Featured Products */}
      <section className="container-main pt-24 pb-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-brand/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand">
              {t('featuredProducts')}
            </span>
            <h2 className="mt-2 text-xl font-bold text-text-primary md:text-2xl">
              Popular Auto Body Parts
            </h2>
          </div>
          <Link
            href="/products"
            className="shrink-0 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
          >
            {t('viewAllProducts')} &rarr;
          </Link>
        </div>

        {products.length === 0 ? (
          <CatalogEmpty variant="all" />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {products.map((p) => (
                <AlibabaProductCard key={p.id} slug={p.slug} sku={p.sku} title={p.title} imageUrl={p.imageUrl} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg border border-brand/30 bg-white px-6 py-2.5 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-white active:scale-[0.97]"
              >
                {t('viewAllProducts')} &rarr;
              </Link>
            </div>
          </>
        )}
      </section>

      {/* 3. Why Choose Us */}
      <WhyChooseUs />

      {/* 4. Categories by brand */}
      <AlibabaProductGroups />

      {/* 5. Factory & Company showcase */}
      <FactoryShowcase />

      {/* 6. Final CTA */}
      <section className="bg-surface-dark py-16">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            {t('ctaTitle')}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-text-on-dark/70">
            {t('ctaDesc')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/inquiry"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark active:scale-[0.97]"
            >
              {t('contactSupplier')}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href={company.alibabaStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              {t('visitAlibabaStore')} &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
