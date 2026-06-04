import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PackageOpen } from 'lucide-react'

type Props = {
  variant?: 'all' | 'category' | 'search'
  categoryTitle?: string
}

export async function CatalogEmpty({ variant = 'all', categoryTitle }: Props) {
  const t = await getTranslations('catalog')

  const title =
    variant === 'category' && categoryTitle
      ? t('emptyCategoryTitle', { category: categoryTitle })
      : variant === 'search'
        ? t('emptySearchTitle')
        : t('emptyTitle')

  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-8 py-16 text-center">
      <PackageOpen className="h-14 w-14 text-zinc-400" />
      <h2 className="mt-4 text-xl font-semibold text-zinc-800">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-zinc-600">{t('emptyBody')}</p>
      <p className="mt-4 max-w-lg rounded-lg bg-white px-4 py-3 text-xs text-zinc-500 border border-zinc-200">
        {t('emptyHint')}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/contact"
          className="rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {t('requestQuote')}
        </Link>
        <a
          href="http://fengchengcar.en.alibaba.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 hover:border-blue-300"
        >
          {t('viewAlibaba')}
        </a>
      </div>
    </div>
  )
}
