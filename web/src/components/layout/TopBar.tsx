import { getTranslations } from 'next-intl/server'
import { company } from '@/lib/company'

export async function TopBar() {
  const t = await getTranslations('topbar')

  return (
    <div className="border-b border-zinc-800 bg-zinc-900 text-zinc-300">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs">
        <span>{company.legalName}</span>
        <div className="flex flex-wrap items-center gap-4">
          <span>{company.location}</span>
          <span className="hidden sm:inline">{t('oemOdm')}</span>
          <a
            href={company.alibabaStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-300 hover:text-white"
          >
            {t('alibaba')}
          </a>
        </div>
      </div>
    </div>
  )
}
