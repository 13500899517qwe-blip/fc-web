'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'

type Props = { images: readonly string[] }

export function AlibabaBannerCarousel({ images }: Props) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % images.length), 4500)
    return () => window.clearInterval(id)
  }, [images.length])

  if (!images.length) return null

  return (
    <section className="relative w-full overflow-hidden bg-zinc-900">
      <div className="relative aspect-[1200/320] w-full min-h-[180px]">
        {images.map((src, i) => (
          <Link key={src} href="/products" className={cn('absolute inset-0 block transition-opacity duration-700', i === index ? 'opacity-100' : 'opacity-0')}>
            <Image src={src} alt="" fill className="object-cover" priority={i === 0} unoptimized />
          </Link>
        ))}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Banner ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn('h-2 rounded-full transition-all', i === index ? 'w-6 bg-[#ff6a00]' : 'w-2 bg-white/60')}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
