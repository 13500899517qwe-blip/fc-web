'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { buildProductsHref } from '@/lib/catalog-url'
import type { AppLocale } from '@/i18n/routing'
import type { CategoryNode } from '@/lib/catalog'
import { company } from '@/lib/company'
import { alibabaStore } from '@/lib/alibaba-store-data'
import { BrandLogo } from '@/components/layout/BrandLogo'

type Props = { categoryTree: CategoryNode[] }

export function SiteFooter({ categoryTree }: Props) {
  const t = useTranslations('footer')
  const ts = useTranslations('store')
  const tn = useTranslations('nav')
  const locale = useLocale() as AppLocale

  return (
    <footer className="border-t border-border-light bg-surface">
      <div className="container-main py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand column */}
          <div>
            <BrandLogo variant="footer" />
            <p className="mt-3 text-sm text-text-tertiary">{company.location}</p>
            <p className="mt-1.5 text-xs text-text-muted">{company.legalName}</p>
            <a
              href={company.alibabaStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
            >
              {t('alibaba')} &rarr;
            </a>
          </div>

          {/* Categories */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary">
              {ts('productCategory')}
            </p>
            <ul className="mt-4 space-y-2">
              {categoryTree.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link
                    href={buildProductsHref({ categorySlug: c.slug })}
                    className="text-sm text-text-secondary transition-colors hover:text-brand"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
              {categoryTree.length > 6 && (
                <li>
                  <Link href="/products" className="text-sm font-semibold text-brand hover:text-brand-dark">
                    {ts('seeAllCategories')} &rarr;
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Quick nav */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary">
              {ts('quickNav')}
            </p>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="text-sm text-text-secondary transition-colors hover:text-brand">{tn('home')}</Link></li>
              <li><Link href="/products" className="text-sm text-text-secondary transition-colors hover:text-brand">{tn('products')}</Link></li>
              <li><Link href="/about" className="text-sm text-text-secondary transition-colors hover:text-brand">{ts('companyProfile')}</Link></li>
              <li><Link href="/contact" className="text-sm text-text-secondary transition-colors hover:text-brand">{ts('contacts')}</Link></li>
              <li><Link href="/inquiry" className="text-sm text-text-secondary transition-colors hover:text-brand">{tn('inquiry')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Auto-translation notice */}
        {locale !== 'en' && (
          <p className="mt-6 text-xs text-text-muted">{t('autoTranslated')}</p>
        )}

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border-light pt-6 sm:flex-row">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            {alibabaStore.metrics.storeRating} &middot; {alibabaStore.metrics.onTimeDelivery} on-time delivery
          </p>
        </div>
      </div>
    </footer>
  )
}
