'use client'

import { useTranslations } from 'next-intl'
import { useInquiryBasket } from './InquiryBasketProvider'

export function AddToInquiryButton({ sku, title }: { sku: string; title: string }) {
  const t = useTranslations('products')
  const { addItem } = useInquiryBasket()

  return (
    <button
      type="button"
      onClick={() => addItem({ sku, title })}
      className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
    >
      {t('inquiry')}
    </button>
  )
}
