'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/cn'
import { alibabaStore } from '@/lib/alibaba-store-data'
import { company } from '@/lib/company'

export function HeroSection() {
  const t = useTranslations('store')
  const [index, setIndex] = useState(0)
  const images = alibabaStore.banners

  useEffect(() => {
    if (images.length <= 1) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % images.length), 5000)
    return () => window.clearInterval(id)
  }, [images.length])

  const stats = [
    { label: 'Store Rating', value: alibabaStore.metrics.storeRating },
    { label: 'On-Time Delivery', value: alibabaStore.metrics.onTimeDelivery },
    { label: 'Response Time', value: alibabaStore.metrics.responseTime },
    { label: 'Floorspace', value: alibabaStore.metrics.floorspace },
  ]

  return (
    <section className="relative overflow-hidden bg-surface-dark">
      {/* Background image carousel */}
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <div
            key={src}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000',
              i === index ? 'opacity-40' : 'opacity-0',
            )}
          >
            <Image src={src} alt="" fill className="object-cover" priority={i === 0} unoptimized />
          </div>
        ))}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/95 via-surface-dark/70 to-surface-dark/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container-main relative z-10">
        <div className="flex min-h-[520px] flex-col justify-center py-20 md:min-h-[560px] lg:min-h-[600px]">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-medium text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {company.businessType} · {alibabaStore.badges[0]}
            </div>

            {/* Headline */}
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl text-balance">
              Premium Auto Body Parts &amp;<br />
              <span className="text-brand">Modified Lighting</span> Manufacturer
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-on-dark/80 md:text-lg">
              OEM/ODM supplier of bumpers, hoods, fenders, doors, tailgates, and LED tail lights.
              98% vehicle model coverage. IATF16949 &amp; ISO9001 certified.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/inquiry"
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/30 active:scale-[0.97]"
              >
                {t('contactSupplier')}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-[0.97]"
              >
                {t('viewAllProducts')}
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar — overlapping bottom */}
        <div className="relative -mb-16 grid grid-cols-2 divide-x divide-white/10 rounded-t-xl border border-white/10 bg-surface-dark-muted/90 px-6 py-5 backdrop-blur md:grid-cols-4">
          {stats.map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-lg font-bold text-white md:text-xl">{value}</p>
              <p className="mt-0.5 text-xs text-text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
