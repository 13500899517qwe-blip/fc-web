import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'
import { CatalogLayout } from '@/components/catalog/CatalogLayout'
import { ProductCard } from '@/components/catalog/ProductCard'
import { CatalogEmpty } from '@/components/catalog/CatalogEmpty'
import { findProducts, getCategoryTree } from '@/lib/catalog-queries'
import { buildProductsHref } from '@/lib/catalog-url'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ q?: string; brand?: string; page?: string }>
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params
  const sp = await searchParams
  setRequestLocale(locale)
  const t = await getTranslations('products')
  const tc = await getTranslations('catalog')

  const brand = sp.brand?.trim()
  const q = sp.q?.trim()
  const page = Math.max(1, parseInt(sp.page || '1', 10) || 1)

  let categoryTree = await getCategoryTree(locale as AppLocale).catch(() => [])
  let result = { docs: [] as Awaited<ReturnType<typeof findProducts>>['docs'], totalDocs: 0, totalPages: 0, page: 1 }

  try {
    categoryTree = await getCategoryTree(locale as AppLocale)
    result = await findProducts({
      locale: locale as AppLocale,
      brand,
      q,
      page,
      limit: 24,
    })
  } catch (e) {
    console.error('[ProductsPage] DB query failed:', e)
  }

  return (
    <CatalogLayout
      categoryTree={categoryTree}
      activeBrand={brand}
      searchQuery={q}
      breadcrumbItems={[
        { label: t('title'), href: '/products' },
        { label: t('all') },
      ]}
      title={t('all')}
      subtitle={brand ? `${tc('filteredBy')}: ${brand}` : undefined}
    >
      {result.docs.length === 0 ? (
        <CatalogEmpty variant={q ? 'search' : 'all'} />
      ) : (
        <>
          <p className="mb-4 text-sm text-text-tertiary">
            {tc('resultsCount', { count: result.totalDocs })}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {result.docs.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {result.totalPages > 1 && (
            <nav className="mt-10 flex items-center justify-center gap-3">
              {page > 1 && (
                <Link
                  href={buildProductsHref({ brand, q, page: page - 1 })}
                  className="rounded-lg border border-border-light bg-surface px-4 py-2 text-sm font-medium text-text-secondary transition-all hover:border-brand/30 hover:text-brand"
                >
                  {tc('prev')}
                </Link>
              )}
              <span className="px-3 text-sm text-text-tertiary">
                {page} / {result.totalPages}
              </span>
              {page < result.totalPages && (
                <Link
                  href={buildProductsHref({ brand, q, page: page + 1 })}
                  className="rounded-lg border border-border-light bg-surface px-4 py-2 text-sm font-medium text-text-secondary transition-all hover:border-brand/30 hover:text-brand"
                >
                  {tc('next')}
                </Link>
              )}
            </nav>
          )}
        </>
      )}
    </CatalogLayout>
  )
}
