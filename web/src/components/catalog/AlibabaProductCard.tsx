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
    <article className="group flex flex-col bg-white">
      <Link href={`/products/${slug}`} className="block overflow-hidden border border-zinc-200">
        <div className="relative aspect-square bg-zinc-50">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-zinc-400">No image</div>
          )}
        </div>
      </Link>
      <div className="mt-2 flex flex-1 flex-col px-0.5">
        <Link href={`/products/${slug}`} className="text-sm leading-snug text-zinc-800 hover:text-[#ff6a00] line-clamp-2">
          {title}
        </Link>
        <p className="mt-2 text-base font-bold text-[#ff6a00]">{hint.price}</p>
        <p className="text-xs text-zinc-500">{hint.moq}</p>
        <div className="mt-3">
          <AddToInquiryButton sku={sku} title={title} compact className="w-full !bg-[#ff6a00] hover:!bg-[#e85f00]" />
        </div>
      </div>
    </article>
  )
}
