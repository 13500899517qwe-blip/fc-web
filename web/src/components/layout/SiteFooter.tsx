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
    <footer className="border-t border-zinc-300 bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <BrandLogo variant="footer" />
            <p className="mt-3 text-sm text-zinc-600">{company.location}</p>
            <a href={company.alibabaStoreUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-[#ff6a00] hover:underline">
              {t('alibaba')}
            </a>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-zinc-500">{ts('productCategory')}</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {categoryTree.map((c) => (
                <li key={c.id}>
                  <Link href={buildProductsHref({ categorySlug: c.slug })} className="text-zinc-700 hover:text-[#ff6a00]">{c.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-zinc-500">{ts('quickNav')}</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li><Link href="/" className="hover:text-[#ff6a00]">{tn('home')}</Link></li>
              <li><Link href="/products" className="hover:text-[#ff6a00]">{tn('products')}</Link></li>
              <li><Link href="/about" className="hover:text-[#ff6a00]">{ts('companyProfile')}</Link></li>
              <li><Link href="/contact" className="hover:text-[#ff6a00]">{ts('contacts')}</Link></li>
              <li><Link href="/inquiry" className="hover:text-[#ff6a00]">{tn('inquiry')}</Link></li>
            </ul>
          </div>
        </div>
        {locale !== 'en' && <p className="mt-6 text-xs text-zinc-500">{t('autoTranslated')}</p>}
        <p className="mt-6 border-t border-zinc-200 pt-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} {company.legalName}. {alibabaStore.metrics.storeRating} · {alibabaStore.metrics.onTimeDelivery} on-time delivery
        </p>
      </div>
    </footer>
  )
}
