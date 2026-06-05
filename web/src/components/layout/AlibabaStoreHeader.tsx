'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { company } from '@/lib/company'
import { alibabaStore, alibabaCompany } from '@/lib/alibaba-store-data'

/** Compact store strip — metrics & services live on homepage, not here */
export function AlibabaStoreHeader() {
  const t = useTranslations('store')

  return (
    <div className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-base font-bold leading-snug text-zinc-900 sm:text-lg">{company.legalName}</h1>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            {alibabaStore.badges.slice(0, 4).map((b) => (
              <span key={b} className="rounded bg-orange-50 px-2 py-0.5 text-[11px] font-medium text-orange-700">
                {b}
              </span>
            ))}
          </div>
          <p className="mt-1.5 text-xs text-zinc-500">
            {alibabaCompany.businessType} · {company.location}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Link
            href="/inquiry"
            className="rounded bg-[#ff6a00] px-5 py-2 text-sm font-semibold text-white hover:bg-[#e85f00]"
          >
            {t('contactSupplier')}
          </Link>
          <Link
            href="/contact"
            className="rounded border border-[#ff6a00] px-5 py-2 text-sm font-semibold text-[#ff6a00] hover:bg-orange-50"
          >
            {t('chatNow')}
          </Link>
        </div>
      </div>
    </div>
  )
}
