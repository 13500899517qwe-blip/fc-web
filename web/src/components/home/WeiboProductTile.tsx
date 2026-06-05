import Image from 'next/image'
import { Link } from '@/i18n/navigation'

type Props = {
  slug: string
  title: string
  imageUrl: string | null
  learnMore: string
}

export function WeiboProductTile({ slug, title, imageUrl, learnMore }: Props) {
  return (
    <article className="group text-center">
      <Link href={`/products/${slug}`} className="block overflow-hidden rounded border border-zinc-200 bg-white">
        <div className="relative aspect-square bg-zinc-100">
          {imageUrl ? (
            <Image src={imageUrl} alt={title} fill className="object-cover transition duration-300 group-hover:scale-105" unoptimized />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-zinc-400">No image</div>
          )}
        </div>
      </Link>
      <Link href={`/products/${slug}`} className="mt-3 block text-sm font-semibold leading-snug text-zinc-800 hover:text-brand line-clamp-2">
        {title}
      </Link>
      <Link href={`/products/${slug}`} className="mt-2 inline-block text-xs font-semibold uppercase text-brand hover:underline">
        {learnMore} →
      </Link>
    </article>
  )
}
