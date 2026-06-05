'use client'

import { useTranslations } from 'next-intl'
import { useInquiryBasket } from './InquiryBasketProvider'
import { cn } from '@/lib/cn'

type Props = {
  sku: string
  title: string
  className?: string
  compact?: boolean
}

export function AddToInquiryButton({ sku, title, className, compact }: Props) {
  const t = useTranslations('products')
  const { addItem, items } = useInquiryBasket()
  const inBasket = items.some((i) => i.sku === sku)

  return (
    <button
      type="button"
      onClick={() => addItem({ sku, title })}
      className={cn(
        'rounded bg-[#ff6a00] font-semibold text-white hover:bg-[#e85f00]',
        compact ? 'px-3 py-1.5 text-xs' : 'px-5 py-2.5 text-sm',
        inBasket && 'bg-zinc-700',
        className,
      )}
    >
      {inBasket ? t('inBasket') : t('inquiry')}
    </button>
  )
}
