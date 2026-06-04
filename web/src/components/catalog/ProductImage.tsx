import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

type Props = {
  src: string | null
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}

export function ProductImage({ src, alt, className, sizes = '(max-width:768px) 100vw, 33vw', priority }: Props) {
  if (src) {
    return (
      <div className={cn('relative aspect-[4/3] overflow-hidden bg-zinc-100', className)}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex aspect-[4/3] flex-col items-center justify-center gap-2 bg-gradient-to-br from-zinc-100 to-zinc-200 text-zinc-400',
        className,
      )}
      aria-hidden
    >
      <ImageIcon className="h-10 w-10 opacity-60" />
      <span className="text-xs font-medium uppercase tracking-wide">Image coming soon</span>
    </div>
  )
}
