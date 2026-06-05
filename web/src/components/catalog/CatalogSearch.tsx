'use client'

import { useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { buildProductsHref } from '@/lib/catalog-url'

type Props = {
  defaultQuery?: string
  categorySlug?: string
  brand?: string
}

export function CatalogSearch({ defaultQuery = '', categorySlug, brand }: Props) {
  const t = useTranslations('catalog')
  const router = useRouter()
  const [q, setQ] = useState(defaultQuery)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(
      buildProductsHref({
        categorySlug,
        brand,
        q: q.trim() || undefined,
      }),
    )
  }

  return (
    <form onSubmit={submit} className="relative w-full max-w-2xl">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t('searchPlaceholder')}
        className="w-full rounded border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
      />
    </form>
  )
}
