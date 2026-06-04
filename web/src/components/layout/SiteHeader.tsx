'use client'

import { useLocale, useTranslations } from 'next-intl'
import { localeLabels, locales, type AppLocale } from '@/i18n/routing'
import { Link, usePathname } from '@/i18n/navigation'
import { ShoppingCart } from 'lucide-react'
import { useInquiryBasket } from '@/components/inquiry/InquiryBasketProvider'

export function SiteHeader() {
  const t = useTranslations('nav')
  const locale = useLocale() as AppLocale
  const pathname = usePathname()
  const { items } = useInquiryBasket()

  const nav = [
    { href: '/', label: t('home') },
    { href: '/products', label: t('products') },
    { href: '/about', label: t('about') },
    { href: '/faq', label: t('faq') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight text-zinc-900">
          LumaDrive LED
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-zinc-700">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? 'text-blue-700' : 'hover:text-blue-700'}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-1 rounded-full bg-blue-700 px-3 py-1.5 text-white hover:bg-blue-800"
          >
            <ShoppingCart className="h-4 w-4" />
            {t('inquiry')}
            {items.length > 0 && (
              <span className="ml-1 rounded-full bg-white px-1.5 text-xs font-bold text-blue-700">
                {items.length}
              </span>
            )}
          </Link>
        </nav>
        <select
          className="rounded border border-zinc-300 px-2 py-1 text-sm"
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
      </div>
    </header>
  )
}
