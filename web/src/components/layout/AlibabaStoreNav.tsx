'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { localeLabels, locales, type AppLocale } from '@/i18n/routing'
import { buildProductsHref } from '@/lib/catalog-url'
import { alibabaStore } from '@/lib/alibaba-store-data'
import { BrandLogo } from '@/components/layout/BrandLogo'
import { ChevronDown, Menu, X } from 'lucide-react'
import { cn } from '@/lib/cn'

export function AlibabaStoreNav() {
  const t = useTranslations('nav')
  const ts = useTranslations('store')
  const locale = useLocale() as AppLocale
  const pathname = usePathname()
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: '/', label: t('home') },
    { href: '/about', label: ts('companyProfile') },
    { href: '/contact', label: ts('contacts') },
  ]

  const productsActive = pathname.startsWith('/products')

  const navLinkClass = (active: boolean) =>
    cn(
      'flex h-full items-center border-b-2 px-4 py-3.5 text-sm font-medium transition-colors lg:px-5',
      active ? 'border-[#ff6a00] bg-white text-[#ff6a00]' : 'border-transparent text-zinc-700 hover:text-[#ff6a00]',
    )

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-300 bg-white shadow-sm">
      <div className="mx-auto flex max-w-[1200px] items-stretch gap-4 px-4">
        <div className="flex shrink-0 items-center py-2">
          <BrandLogo variant="nav" />
        </div>

        <ul className="hidden min-w-0 flex-1 items-stretch lg:flex">
          {links.slice(0, 1).map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={navLinkClass(pathname === item.href)}>
                {item.label}
              </Link>
            </li>
          ))}

          <li
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <div className={cn('flex h-full items-stretch border-b-2', productsActive ? 'border-[#ff6a00] bg-white' : 'border-transparent')}>
              <Link href="/products" className={navLinkClass(productsActive)}>
                {t('products')}
              </Link>
              <span className="flex items-center pr-2 text-zinc-500" aria-hidden>
                <ChevronDown className={cn('h-4 w-4 transition-transform', productsOpen && 'rotate-180 text-[#ff6a00]')} />
              </span>
            </div>
            {productsOpen && (
              <div className="absolute left-0 top-full z-50 w-[640px] border border-zinc-200 bg-white p-4 shadow-xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">{ts('productCategory')}</p>
                <div className="grid grid-cols-2 gap-1">
                  {alibabaStore.productGroups.map(({ label, brand }) => (
                    <Link
                      key={brand}
                      href={buildProductsHref({ brand })}
                      className="rounded px-2 py-2 text-sm text-zinc-700 hover:bg-orange-50 hover:text-[#ff6a00]"
                      onClick={() => setProductsOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/products"
                  className="mt-3 block border-t border-zinc-100 pt-3 text-sm font-semibold text-[#ff6a00] hover:underline"
                  onClick={() => setProductsOpen(false)}
                >
                  {ts('seeAllCategories')} →
                </Link>
              </div>
            )}
          </li>

          {links.slice(1).map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={navLinkClass(pathname === item.href)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 py-2">
          <select
            className="hidden rounded border border-zinc-300 bg-white px-2 py-1.5 text-xs sm:block"
            value={locale}
            onChange={(e) => {
              const next = e.target.value as AppLocale
              window.location.href = `/${next}${pathname === '/' ? '' : pathname}`
            }}
          >
            {locales.map((l) => (
              <option key={l} value={l}>
                {localeLabels[l]}
              </option>
            ))}
          </select>
          <Link
            href="/inquiry"
            className="hidden rounded bg-[#ff6a00] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#e85f00] sm:inline-block"
          >
            {t('inquiry')}
          </Link>
          <button type="button" className="rounded border border-zinc-300 p-2 lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 py-3 lg:hidden">
          <ul className="space-y-1 text-sm">
            {links.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-2" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="block py-2 font-medium text-[#ff6a00]" onClick={() => setMobileOpen(false)}>
                {t('products')}
              </Link>
            </li>
            <li>
              <Link href="/inquiry" className="block py-2" onClick={() => setMobileOpen(false)}>
                {t('inquiry')}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
