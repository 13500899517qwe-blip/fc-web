import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getPriceHint } from '@/lib/alibaba-store-data'
import { AddToInquiryButton } from '@/components/inquiry/AddToInquiryButton'

type Props = {
  slug: string
  sku: string
  title: string
  imageUrl: string | null
}

export function AlibabaProductCard({ slug, sku, title, imageUrl }: Props) {
  const hint = getPriceHint(sku)

  return (
    <article className="group flex flex-col rounded-xl border border-border-light bg-surface shadow-card transition-all hover:shadow-card-hover hover:border-brand/20">
      <Link href={`/products/${slug}`} className="block overflow-hidden rounded-t-xl">
        <div className="relative aspect-square bg-surface-subtle">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-text-muted">No image</div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-3">
        <Link
          href={`/products/${slug}`}
          className="text-sm leading-snug text-text-primary transition-colors hover:text-brand line-clamp-2"
        >
          {title}
        </Link>
        <div className="mt-auto pt-3">
          <p className="text-base font-bold text-brand">{hint.price}</p>
          <p className="text-xs text-text-tertiary">{hint.moq}</p>
          <div className="mt-3">
            <AddToInquiryButton sku={sku} title={title} compact className="w-full !bg-brand text-white hover:!bg-brand-dark" />
          </div>
        </div>
      </div>
    </article>
  )
}
