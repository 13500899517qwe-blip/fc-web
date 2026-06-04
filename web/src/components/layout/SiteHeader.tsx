'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { localeLabels, locales, type AppLocale } from '@/i18n/routing'
import { Link, usePathname } from '@/i18n/navigation'
import { company } from '@/lib/company'
import { Menu, ShoppingCart, X } from 'lucide-react'
import { useInquiryBasket } from '@/components/inquiry/InquiryBasketProvider'
import { MegaMenu } from '@/components/layout/MegaMenu'
import { CatalogSearch } from '@/components/catalog/CatalogSearch'
import type { CategoryNode } from '@/lib/catalog'
import { cn } from '@/lib/cn'

type Props = { categoryTree: CategoryNode[] }

export function SiteHeader({ categoryTree }: Props) {
  const t = useTranslations('nav')
  const locale = useLocale() as AppLocale
  const pathname = usePathname()
  const { items } = useInquiryBasket()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/faq', label: t('faq') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-100 bg-zinc-50/80">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2">
          <CatalogSearch />
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="shrink-0">
          <span className="text-xl font-bold tracking-tight text-zinc-900">
            {company.brandShort}
          </span>
          <span className="hidden text-xs text-zinc-500 sm:block">B2B · OEM/ODM</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          <Link
            href="/"
            className={cn(
              'text-sm font-medium',
              pathname === '/' ? 'text-blue-800' : 'text-zinc-700 hover:text-blue-700',
            )}
          >
            {t('home')}
          </Link>
          <MegaMenu categoryTree={categoryTree} />
          {navLinks.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium',
                pathname === item.href ? 'text-blue-800' : 'text-zinc-700 hover:text-blue-700',
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-800 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <ShoppingCart className="h-4 w-4" />
            {t('inquiry')}
            {items.length > 0 && (
              <span className="rounded-full bg-amber-400 px-1.5 text-xs font-bold text-zinc-900">
                {items.length}
              </span>
            )}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <select
            className="rounded-lg border border-zinc-300 px-2 py-1.5 text-sm"
            value={locale}
            onChange={(e) => {
              const next = e.target.value as AppLocale
              window.location.href = `/${next}${pathname === '/' ? '' : pathname}`
            }}
            aria-label="Language"
          >
            {locales.map((l) => (
              <option key={l} value={l}>
                {localeLabels[l]}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="rounded-lg border border-zinc-300 p-2 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-zinc-200 bg-white px-4 py-4 lg:hidden">
          <ul className="space-y-2 text-sm font-medium">
            <li>
              <Link href="/" onClick={() => setMobileOpen(false)}>
                {t('home')}
              </Link>
            </li>
            <li>
              <Link href="/products" onClick={() => setMobileOpen(false)}>
                {t('products')}
              </Link>
            </li>
            {navLinks.slice(1).map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/inquiry"
                className="inline-flex items-center gap-1 text-blue-800"
                onClick={() => setMobileOpen(false)}
              >
                <ShoppingCart className="h-4 w-4" />
                {t('inquiry')} ({items.length})
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
