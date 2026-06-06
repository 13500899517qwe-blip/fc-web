import { getTranslations } from 'next-intl/server'
import { company } from '@/lib/company'
import { Mail, MapPin, Phone } from 'lucide-react'

export async function TopBar() {
  const t = await getTranslations('topbar')

  return (
    <div className="bg-surface-dark text-text-on-dark">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {company.phone && (
            <a href={`tel:${company.phone}`} className="inline-flex items-center gap-1 hover:text-white">
              <Phone className="h-3.5 w-3.5" />
              {company.phone}
            </a>
          )}
          {company.contactEmail && company.contactEmail !== 'Contact via inquiry form' && (
            <a href={`mailto:${company.contactEmail}`} className="inline-flex items-center gap-1 hover:text-white">
              <Mail className="h-3.5 w-3.5" />
              {company.contactEmail}
            </a>
          )}
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {company.location}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">{t('oemOdm')}</span>
          <a
            href={company.alibabaStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-light hover:text-white"
          >
            {t('alibaba')} →
          </a>
        </div>
      </div>
    </div>
  )
}
