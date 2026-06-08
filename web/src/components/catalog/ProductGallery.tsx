'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  images: string[]
  alt: string
  className?: string
}

const EXTERNAL_CDN = /alicdn\.com/

export function ProductGallery({ images, alt, className }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const safeImages = images.length > 0 ? images : []
  const current = safeImages[activeIndex] ?? null

  if (!current) {
    return (
      <div className={cn('flex aspect-square items-center justify-center rounded-lg bg-surface-subtle text-text-muted', className)}>
        <span className="text-sm">No image available</span>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-surface-subtle">
        <Image
          src={current}
          alt={`${alt} - image ${activeIndex + 1}`}
          fill
          className="object-contain transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={activeIndex === 0}
          unoptimized={EXTERNAL_CDN.test(current)}
        />

        {/* Nav arrows */}
        {safeImages.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex(i => (i - 1 + safeImages.length) % safeImages.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-text-primary shadow-md backdrop-blur-sm transition hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveIndex(i => (i + 1) % safeImages.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-text-primary shadow-md backdrop-blur-sm transition hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Position indicator */}
        {safeImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {safeImages.map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  i === activeIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {safeImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                'relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                i === activeIndex
                  ? 'border-brand ring-1 ring-brand'
                  : 'border-border-light opacity-70 hover:opacity-100'
              )}
            >
              <Image
                src={src}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
                unoptimized={EXTERNAL_CDN.test(src)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
