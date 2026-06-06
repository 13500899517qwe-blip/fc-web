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
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t('searchPlaceholder')}
        className="w-full rounded-lg border border-border-light bg-surface py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
      />
    </form>
  )
}
