import { getTranslations } from 'next-intl/server'
import { CatalogSidebar } from '@/components/catalog/CatalogSidebar'
import { CatalogSearch } from '@/components/catalog/CatalogSearch'
import { Breadcrumbs } from '@/components/catalog/Breadcrumbs'
import type { CategoryNode } from '@/lib/catalog'

type Props = {
  categoryTree: CategoryNode[]
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="hidden w-56 shrink-0 lg:block">
          <CatalogSidebar
            categoryTree={categoryTree}
            activeCategory={activeCategory}
            activeBrand={activeBrand}
            searchQuery={searchQuery}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">{title}</h1>
              {subtitle && <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>}
              <p className="mt-2 text-xs text-amber-800">{t('quoteNote')}</p>
            </div>
            <div className="lg:hidden w-full">
              <CatalogSearch
                defaultQuery={searchQuery}
                categorySlug={activeCategory}
                brand={activeBrand}
              />
            </div>
          </div>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
