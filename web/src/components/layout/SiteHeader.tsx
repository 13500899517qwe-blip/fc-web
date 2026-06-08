'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { localeLabels, locales, type AppLocale } from '@/i18n/routing'
import { Link, usePathname } from '@/i18n/navigation'
import { CatalogSearch } from '@/components/catalog/CatalogSearch'
import { company } from '@/lib/company'
import { ChevronDown, Menu, ShoppingCart, X } from 'lucide-react'
import { useInquiryBasket } from '@/components/inquiry/InquiryBasketProvider'
import { buildProductsHref } from '@/lib/catalog-url'
import { vehicleBrands, type CategoryNode } from '@/lib/catalog'
import { cn } from '@/lib/cn'

type Props = { categoryTree: CategoryNode[] }

export function SiteHeader({ categoryTree }: Props) {
  const t = useTranslations('nav')
  const locale = useLocale() as AppLocale
  const pathname = usePathname()
  const { items } = useInquiryBasket()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)

  const mainNav = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/blog', label: t('blog') },
    { href: '/faq', label: t('faq') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white shadow-sm">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="flex items-center justify-between gap-4 py-3">
          <Link href="/" className="shrink-0">
            <div className="relative h-20 w-80">
              <Image src="/logo.svg" alt={company.brandName} fill className="object-contain object-left" priority />
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex">
            {mainNav.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium uppercase tracking-wide',
                  pathname === item.href ? 'text-brand' : 'text-zinc-700 hover:text-brand',
                )}
              >
                {item.label}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-medium uppercase tracking-wide text-zinc-700 hover:text-brand"
              >
                {t('products')}
                <ChevronDown className={cn('h-4 w-4 transition', productsOpen && 'rotate-180')} />
              </button>
              {productsOpen && (
                <div className="absolute left-1/2 top-full z-50 w-[720px] -translate-x-1/2 pt-2">
                  <div className="grid grid-cols-3 gap-6 rounded border border-zinc-200 bg-white p-6 shadow-xl">
                    <div className="col-span-2">
                      <p className="text-xs font-bold uppercase text-zinc-500">{t('byCategory')}</p>
                      <div className="mt-3 grid grid-cols-2 gap-4">
                        {categoryTree.map((l1) => (
                          <div key={l1.id}>
                            <Link
                              href={buildProductsHref({ categorySlug: l1.slug })}
                              className="font-semibold text-zinc-900 hover:text-brand"
                              onClick={() => setProductsOpen(false)}
                            >
                              {l1.title}
                            </Link>
                            <ul className="mt-1 space-y-0.5">
                              {l1.children.map((l2) => (
                                <li key={l2.id}>
                                  <Link
                                    href={buildProductsHref({ categorySlug: l2.slug })}
                                    className="text-sm text-zinc-600 hover:text-brand"
                                    onClick={() => setProductsOpen(false)}
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
                    <div className="border-l border-zinc-100 pl-4">
                      <p className="text-xs font-bold uppercase text-zinc-500">{t('byVehicle')}</p>
                      <ul className="mt-3 max-h-56 space-y-1 overflow-y-auto">
                        {vehicleBrands.map((brand) => (
                          <li key={brand}>
                            <Link
                              href={buildProductsHref({ brand })}
                              className="text-sm text-zinc-700 hover:text-brand"
                              onClick={() => setProductsOpen(false)}
                            >
                              {brand}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link href="/products" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
                        {t('viewAllProducts')}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {mainNav.slice(2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium uppercase tracking-wide',
                  pathname === item.href ? 'text-brand' : 'text-zinc-700 hover:text-brand',
                )}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/inquiry"
              className="inline-flex items-center gap-1.5 rounded bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-light"
            >
              <ShoppingCart className="h-4 w-4" />
              {t('inquiry')}
              {items.length > 0 && (
                <span className="rounded-full bg-amber-400 px-1.5 text-xs font-bold text-zinc-900">{items.length}</span>
              )}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <select
              className="rounded border border-zinc-300 px-2 py-1 text-xs"
              value={locale}
              onChange={(e) => {
                const next = e.target.value as AppLocale
                window.location.href = `/${next}${pathname === '/' ? '' : pathname}`
              }}
              aria-label="Language"
            >
              {locales.map((l) => (
                <option key={l} value={l}>{localeLabels[l]}</option>
              ))}
            </select>
            <button type="button" className="rounded border border-zinc-300 p-2 lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="hidden border-t border-zinc-100 py-3 lg:block">
          <CatalogSearch />
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-zinc-200 bg-white px-4 py-4 lg:hidden">
          <CatalogSearch />
          <ul className="mt-4 space-y-2 text-sm font-medium">
            {mainNav.map((item) => (
              <li key={item.href}><Link href={item.href} onClick={() => setMobileOpen(false)}>{item.label}</Link></li>
            ))}
            <li><Link href="/products" onClick={() => setMobileOpen(false)}>{t('products')}</Link></li>
            <li><Link href="/inquiry" onClick={() => setMobileOpen(false)}>{t('inquiry')} ({items.length})</Link></li>
          </ul>
        </nav>
      )}
    </header>
  )
}
