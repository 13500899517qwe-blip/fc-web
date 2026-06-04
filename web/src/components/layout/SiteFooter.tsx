'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'

export function SiteFooter() {
  const t = useTranslations('footer')
  const locale = useLocale() as AppLocale

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-900 text-zinc-300">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">LumaDrive LED</p>
            <p className="mt-2 max-w-md text-sm">
              Automotive LED headlights, fog lights & mounting brackets for global B2B partners.
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/products" className="hover:text-white">
              Products
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link href="/faq" className="hover:text-white">
              FAQ
            </Link>
          </div>
        </div>
        {locale !== 'en' && (
          <p className="mt-6 text-xs text-amber-200/90">{t('autoTranslated')}</p>
        )}
        <p className="mt-4 text-xs text-zinc-500">
          © {new Date().getFullYear()} LumaDrive LED. {t('rights')}
        </p>
      </div>
    </footer>
  )
}
