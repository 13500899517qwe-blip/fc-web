'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'

type Slide = { src: string; alt: string; href?: string; caption?: string }

type Props = { slides: Slide[]; ctaLabel: string }

export function HomeCarousel({ slides, ctaLabel }: Props) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000)
    return () => window.clearInterval(id)
  }, [slides.length])

  if (slides.length === 0) return null

  const slide = slides[index]

  return (
    <section className="relative w-full overflow-hidden bg-zinc-900">
      <div className="relative aspect-[21/7] min-h-[220px] w-full md:min-h-[320px]">
        {slides.map((s, i) => (
          <div key={s.src} className={cn('absolute inset-0 transition-opacity duration-700', i === index ? 'opacity-100' : 'opacity-0')}>
            <Image src={s.src} alt={s.alt} fill className="object-cover" priority={i === 0} unoptimized />
            <div className="absolute inset-0 bg-black/35" />
          </div>
        ))}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          {slide.caption && (
            <h2 className="max-w-4xl text-2xl font-bold uppercase tracking-wide md:text-4xl">{slide.caption}</h2>
          )}
          <Link href={slide.href || '/products'} className="btn-primary mt-6">
            {ctaLabel}
          </Link>
        </div>
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn('h-2 rounded-full transition-all', i === index ? 'w-8 bg-white' : 'w-2 bg-white/50')}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
