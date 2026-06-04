'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ChevronDown } from 'lucide-react'
import { buildProductsHref } from '@/lib/catalog-url'
import { vehicleBrands, type CategoryNode } from '@/lib/catalog'
import { cn } from '@/lib/cn'

type Props = { categoryTree: CategoryNode[] }

export function MegaMenu({ categoryTree }: Props) {
  const t = useTranslations('nav')
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="inline-flex items-center gap-1 text-sm font-medium text-zinc-700 hover:text-blue-700"
        aria-expanded={open}
      >
        {t('products')}
        <ChevronDown className={cn('h-4 w-4 transition', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 w-[min(100vw-2rem,56rem)] pt-2">
          <div className="grid grid-cols-3 gap-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-xl">
            <div className="col-span-2">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                {t('byCategory')}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-4">
                {categoryTree.map((l1) => (
                  <div key={l1.id}>
                    <Link
                      href={buildProductsHref({ categorySlug: l1.slug })}
                      className="font-semibold text-zinc-900 hover:text-blue-700"
                      onClick={() => setOpen(false)}
                    >
                      {l1.title}
                    </Link>
                    <ul className="mt-1 space-y-0.5">
                      {l1.children.slice(0, 6).map((l2) => (
                        <li key={l2.id}>
                          <Link
                            href={buildProductsHref({ categorySlug: l2.slug })}
                            className="text-sm text-zinc-600 hover:text-blue-700"
                            onClick={() => setOpen(false)}
                          >
                            {l2.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-l border-zinc-100 pl-6">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                {t('byVehicle')}
              </p>
              <ul className="mt-3 max-h-64 space-y-1 overflow-y-auto">
                {vehicleBrands.map((brand) => (
                  <li key={brand}>
                    <Link
                      href={buildProductsHref({ brand })}
                      className="text-sm text-zinc-700 hover:text-blue-700"
                      onClick={() => setOpen(false)}
                    >
                      {brand}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/products"
                className="mt-4 inline-block text-sm font-semibold text-blue-700 hover:underline"
                onClick={() => setOpen(false)}
              >
                {t('viewAllProducts')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
