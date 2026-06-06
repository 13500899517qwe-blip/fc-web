'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { buildProductsHref } from '@/lib/catalog-url'
import { vehicleBrands, type CategoryNode } from '@/lib/catalog'
import { cn } from '@/lib/cn'

type Props = {
  categoryTree: CategoryNode[]
  activeCategory?: string
  activeBrand?: string
  searchQuery?: string
}

export function CatalogSidebar({
  categoryTree,
  activeCategory,
  activeBrand,
  searchQuery,
}: Props) {
  const t = useTranslations('catalog')

  const href = (overrides: { categorySlug?: string; brand?: string }) =>
    buildProductsHref({
      categorySlug: overrides.categorySlug ?? activeCategory,
      brand: overrides.brand,
      q: searchQuery,
    })

  return (
    <aside className="space-y-8">
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-text-tertiary">
          {t('byCategory')}
        </h2>
        <ul className="mt-3 space-y-1">
          <li>
            <Link
              href={href({ categorySlug: undefined, brand: activeBrand })}
              className={cn(
                'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                !activeCategory ? 'bg-brand/10 text-brand-dark' : 'text-text-secondary hover:bg-surface-subtle',
              )}
            >
              {t('allProducts')}
            </Link>
          </li>
          {categoryTree.map((l1) => (
            <li key={l1.id}>
              <Link
                href={href({ categorySlug: l1.slug, brand: activeBrand })}
                className={cn(
                  'block rounded-md px-3 py-2 text-sm font-semibold transition-colors',
                  activeCategory === l1.slug
                    ? 'bg-brand/10 text-brand-dark'
                    : 'text-text-primary hover:bg-surface-subtle',
                )}
              >
                {l1.title}
              </Link>
              {l1.children.length > 0 && (
                <ul className="ml-3 border-l border-border-light pl-2">
                  {l1.children.map((l2) => (
                    <li key={l2.id}>
                      <Link
                        href={href({ categorySlug: l2.slug, brand: activeBrand })}
                        className={cn(
                          'block rounded-md px-2 py-1.5 text-sm transition-colors',
                          activeCategory === l2.slug
                            ? 'font-medium text-brand-dark'
                            : 'text-text-tertiary hover:text-brand',
                        )}
                      >
                        {l2.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-text-tertiary">
          {t('byVehicle')}
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href={href({ brand: undefined })}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              !activeBrand
                ? 'border-text-tertiary bg-surface-subtle text-text-primary'
                : 'border-border-light bg-surface text-text-tertiary hover:border-brand',
            )}
          >
            {t('allBrands')}
          </Link>
          {vehicleBrands.map((brand) => (
            <Link
              key={brand}
              href={href({ brand: activeBrand === brand ? undefined : brand })}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                activeBrand === brand
                  ? 'border-brand bg-brand text-white'
                  : 'border-border-light bg-surface text-text-secondary hover:border-brand',
              )}
            >
              {brand}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
