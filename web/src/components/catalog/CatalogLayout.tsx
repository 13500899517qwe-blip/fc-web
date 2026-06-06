import { getTranslations } from 'next-intl/server'
import { CatalogSidebar } from '@/components/catalog/CatalogSidebar'
import { CatalogSearch } from '@/components/catalog/CatalogSearch'
import { Breadcrumbs } from '@/components/catalog/Breadcrumbs'
import { Info } from 'lucide-react'

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
      {/* Header bar */}
      <div className="border-b border-border-light bg-surface py-6">
        <div className="container-main">
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className="mt-3 text-xl font-bold text-text-primary md:text-2xl">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>}
          <div className="mt-4 max-w-xl">
            <CatalogSearch defaultQuery={searchQuery} categorySlug={activeCategory} brand={activeBrand} />
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="container-main py-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="rounded-xl border border-border-light bg-surface p-4 shadow-card">
              <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary">
                {ts('seeAllCategories')}
              </p>
              <CatalogSidebar
                categoryTree={categoryTree}
                activeCategory={activeCategory}
                activeBrand={activeBrand}
                searchQuery={searchQuery}
              />
            </div>
          </aside>
          <div className="min-w-0 flex-1">
            <div className="mb-4 flex items-start gap-2 rounded-lg bg-brand/5 px-4 py-3 text-xs text-text-secondary">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
              <span>{t('quoteNote')}</span>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
