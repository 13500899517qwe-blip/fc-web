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
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          {t('byCategory')}
        </h2>
        <ul className="mt-3 space-y-1">
          <li>
            <Link
              href={href({ categorySlug: undefined, brand: activeBrand })}
              className={cn(
                'block rounded-md px-3 py-2 text-sm font-medium',
                !activeCategory ? 'bg-blue-50 text-blue-800' : 'text-zinc-700 hover:bg-zinc-100',
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
                  'block rounded-md px-3 py-2 text-sm font-semibold',
                  activeCategory === l1.slug
                    ? 'bg-blue-50 text-blue-800'
                    : 'text-zinc-800 hover:bg-zinc-100',
                )}
              >
                {l1.title}
              </Link>
              {l1.children.length > 0 && (
                <ul className="ml-3 border-l border-zinc-200 pl-2">
                  {l1.children.map((l2) => (
                    <li key={l2.id}>
                      <Link
                        href={href({ categorySlug: l2.slug, brand: activeBrand })}
                        className={cn(
                          'block rounded-md px-2 py-1.5 text-sm',
                          activeCategory === l2.slug
                            ? 'font-medium text-blue-700'
                            : 'text-zinc-600 hover:text-blue-700',
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
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          {t('byVehicle')}
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href={href({ brand: undefined })}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium',
              !activeBrand
                ? 'border-zinc-400 bg-zinc-100 text-zinc-800'
                : 'border-zinc-300 bg-white text-zinc-600 hover:border-blue-400',
            )}
          >
            {t('allBrands')}
          </Link>
          {vehicleBrands.map((brand) => (
            <Link
              key={brand}
              href={href({ brand: activeBrand === brand ? undefined : brand })}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition',
                activeBrand === brand
                  ? 'border-blue-700 bg-blue-700 text-white'
                  : 'border-zinc-300 bg-white text-zinc-700 hover:border-blue-400',
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
