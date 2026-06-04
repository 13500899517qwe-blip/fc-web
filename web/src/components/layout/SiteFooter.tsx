'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { buildProductsHref } from '@/lib/catalog-url'
import type { AppLocale } from '@/i18n/routing'
import type { CategoryNode } from '@/lib/catalog'
import { company } from '@/lib/company'

type Props = { categoryTree: CategoryNode[] }

export function SiteFooter({ categoryTree }: Props) {
  const t = useTranslations('footer')
  const tn = useTranslations('nav')
  const locale = useLocale() as AppLocale

  return (
    <footer className="mt-auto border-t border-zinc-800 bg-zinc-900 text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-xl font-bold text-white">{company.brandName}</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed">{company.tagline}</p>
            <a
              href={company.alibabaStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-blue-300 hover:text-white"
            >
              {t('alibaba')}
            </a>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              {tn('products')}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-white">
                  {tn('products')}
                </Link>
              </li>
              {categoryTree.map((c) => (
                <li key={c.id}>
                  <Link
                    href={buildProductsHref({ categorySlug: c.slug })}
                    className="hover:text-white"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              {t('companyLinks')}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white">
                  {tn('about')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  {tn('faq')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  {tn('contact')}
                </Link>
              </li>
              <li>
                <Link href="/inquiry" className="hover:text-white">
                  {tn('inquiry')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {locale !== 'en' && (
          <p className="mt-8 text-xs text-amber-200/90">{t('autoTranslated')}</p>
        )}
        <p className="mt-6 border-t border-zinc-800 pt-6 text-xs text-zinc-500">
          © {new Date().getFullYear()} {t('company')}. {t('rights')}
        </p>
      </div>
    </footer>
  )
}
