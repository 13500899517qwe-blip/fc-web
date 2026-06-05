import { getTranslations } from 'next-intl/server'
import { CatalogSidebar } from '@/components/catalog/CatalogSidebar'
import { CatalogSearch } from '@/components/catalog/CatalogSearch'
import { Breadcrumbs } from '@/components/catalog/Breadcrumbs'

type Props = {
  categoryTree: Awaited<ReturnType<typeof import('@/lib/catalog-queries').getCategoryTree>>
  activeCategory?: string
  activeBrand?: string
  searchQuery?: string
  breadcrumbItems: { label: string; href?: string }[]
  title: string
  subtitle?: string
  children: React.ReactNode
}

export async function CatalogLayout({
  categoryTree,
  activeCategory,
  activeBrand,
  searchQuery,
  breadcrumbItems,
  title,
  subtitle,
  children,
}: Props) {
  const t = await getTranslations('catalog')
  const ts = await getTranslations('store')

  return (
    <div className="min-h-[60vh]">
      <div className="border-b border-zinc-200 bg-white py-4">
        <div className="mx-auto max-w-[1200px] px-4">
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className="mt-3 text-xl font-bold text-zinc-900">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>}
          <div className="mt-4 max-w-xl">
            <CatalogSearch defaultQuery={searchQuery} categorySlug={activeCategory} brand={activeBrand} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 py-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="hidden w-52 shrink-0 lg:block">
            <div className="rounded border border-zinc-200 bg-white p-4">
              <p className="text-xs font-bold uppercase text-zinc-500">{ts('seeAllCategories')}</p>
              <CatalogSidebar
                categoryTree={categoryTree}
                activeCategory={activeCategory}
                activeBrand={activeBrand}
                searchQuery={searchQuery}
              />
            </div>
          </aside>
          <div className="min-w-0 flex-1">
            <p className="mb-4 text-xs text-amber-800">{t('quoteNote')}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
