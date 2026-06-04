import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'
import { CatalogLayout } from '@/components/catalog/CatalogLayout'
import { ProductCard } from '@/components/catalog/ProductCard'
import { CatalogEmpty } from '@/components/catalog/CatalogEmpty'
import {
  findProducts,
  getCategoryBySlug,
  getCategoryTree,
} from '@/lib/catalog-queries'
import { buildProductsHref } from '@/lib/catalog-url'

type Props = {
  params: Promise<{ locale: string; slug: string }>
  searchParams: Promise<{ q?: string; brand?: string; page?: string }>
}

export default async function CategoryProductsPage({ params, searchParams }: Props) {
  const { locale, slug } = await params
  const sp = await searchParams
  setRequestLocale(locale)
  const t = await getTranslations('products')
  const tc = await getTranslations('catalog')

  const category = await getCategoryBySlug(locale as AppLocale, slug).catch(() => null)
  if (!category) notFound()

  const brand = sp.brand?.trim()
  const q = sp.q?.trim()
  const page = Math.max(1, parseInt(sp.page || '1', 10) || 1)

  const categoryTree = await getCategoryTree(locale as AppLocale).catch(() => [])
  const result = await findProducts({
    locale: locale as AppLocale,
    categorySlug: slug,
    brand,
    q,
    page,
    limit: 24,
  }).catch(() => ({ docs: [], totalDocs: 0, totalPages: 0, page: 1 }))

  return (
    <CatalogLayout
      categoryTree={categoryTree}
      activeCategory={slug}
      activeBrand={brand}
      searchQuery={q}
      breadcrumbItems={[
        { label: t('title'), href: '/products' },
        { label: category.title },
      ]}
      title={category.title}
      subtitle={brand ? `${tc('filteredBy')}: ${brand}` : tc('categorySlot')}
    >
      {result.docs.length === 0 ? (
        <CatalogEmpty variant="category" categoryTitle={category.title} />
      ) : (
        <>
          <p className="mb-4 text-sm text-zinc-500">
            {tc('resultsCount', { count: result.totalDocs })}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {result.docs.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {result.totalPages > 1 && (
            <nav className="mt-10 flex justify-center gap-2">
              {page > 1 && (
                <Link
                  href={buildProductsHref({ categorySlug: slug, brand, q, page: page - 1 })}
                  className="rounded-lg border px-4 py-2 text-sm hover:bg-zinc-100"
                >
                  {tc('prev')}
                </Link>
              )}
              <span className="px-4 py-2 text-sm text-zinc-600">
                {page} / {result.totalPages}
              </span>
              {page < result.totalPages && (
                <Link
                  href={buildProductsHref({ categorySlug: slug, brand, q, page: page + 1 })}
                  className="rounded-lg border px-4 py-2 text-sm hover:bg-zinc-100"
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
