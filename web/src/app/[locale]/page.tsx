import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPayload } from '@/lib/payload'
import type { AppLocale } from '@/i18n/routing'
import { CatalogEmpty } from '@/components/catalog/CatalogEmpty'
import { AlibabaProductCard } from '@/components/catalog/AlibabaProductCard'
import { findProducts } from '@/lib/catalog-queries'
import { resolveProductImageUrl } from '@/lib/media'
import { alibabaStore, alibabaCompany } from '@/lib/alibaba-store-data'
import { company } from '@/lib/company'
import { AlibabaBannerCarousel } from '@/components/home/AlibabaBannerCarousel'
import { AlibabaStoreTrustBar } from '@/components/home/AlibabaStoreTrustBar'
import { AlibabaProductGroups } from '@/components/home/AlibabaProductGroups'

type Props = { params: Promise<{ locale: string }> }

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('store')

  let products: Awaited<ReturnType<typeof findProducts>>['docs'] = []

  try {
    const result = await findProducts({ locale: locale as AppLocale, limit: 12, page: 1 })
    const payload = await getPayload()
    const featuredResult = await payload.find({
      collection: 'products',
      locale: locale as AppLocale,
      limit: 12,
      where: { featured: { equals: true } },
      depth: 1,
    })
    if (featuredResult.docs.length > 0) {
      products = featuredResult.docs.map((doc) => {
        const image = doc.image as { url?: string } | number | null
        const sku = doc.sku as string
        return {
          id: String(doc.id),
          sku,
          title: doc.title as string,
          slug: doc.slug as string,
          imageUrl: resolveProductImageUrl(image, sku, doc.sourceImageUrl as string | undefined),
          imageAlt: doc.title as string,
        }
      })
    } else {
      products = result.docs
    }
  } catch {
    /* DB not ready */
  }

  return (
    <div>
      <AlibabaBannerCarousel images={alibabaStore.banners} />
      <AlibabaStoreTrustBar />

      <section className="mx-auto max-w-[1200px] px-4 py-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-lg font-bold text-zinc-900">{t('featuredProducts')}</h2>
          <Link href="/products" className="text-sm font-semibold text-[#ff6a00] hover:underline">
            {t('viewAllProducts')} →
          </Link>
        </div>
        {products.length === 0 ? (
          <CatalogEmpty variant="all" />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {products.map((p) => (
              <AlibabaProductCard key={p.id} slug={p.slug} sku={p.sku} title={p.title} imageUrl={p.imageUrl} />
            ))}
          </div>
        )}
        <div className="mt-8 text-center">
          <Link href="/products" className="inline-block rounded bg-[#ff6a00] px-8 py-2.5 text-sm font-semibold text-white hover:bg-[#e85f00]">
            {t('viewAllProducts')} →
          </Link>
        </div>
      </section>

      <AlibabaProductGroups />

      {/* Company introduction — mirrors Alibaba store home */}
      <section className="border-t border-zinc-200 bg-white py-10">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-4 md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded border border-zinc-200">
            <Image src={alibabaStore.companyVideoPoster} alt="" fill className="object-cover" unoptimized />
          </div>
          <div>
            <h2 className="text-lg font-bold uppercase text-zinc-900">{t('companyIntroduction')}</h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-700">{alibabaStore.companyIntro}</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">{alibabaCompany.aboutEn}</p>
            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div><dt className="text-zinc-500">{t('founded')}</dt><dd className="font-semibold">{alibabaStore.companyFacts.founded}</dd></div>
              <div><dt className="text-zinc-500">{t('employees')}</dt><dd className="font-semibold">{alibabaStore.companyFacts.employees}</dd></div>
              <div className="col-span-2"><dt className="text-zinc-500">{t('mainMarkets')}</dt><dd className="font-semibold">{alibabaStore.companyFacts.mainMarkets}</dd></div>
              <div className="col-span-2"><dt className="text-zinc-500">{t('mainProducts')}</dt><dd className="font-semibold">{alibabaStore.companyFacts.mainProducts}</dd></div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/about" className="text-sm font-semibold text-[#ff6a00] hover:underline">{t('learnMoreAboutUs')} →</Link>
              <Link href="/inquiry" className="rounded bg-[#ff6a00] px-5 py-2 text-sm font-semibold text-white">{t('contactSupplier')}</Link>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-[1200px] grid-cols-2 gap-3 px-4 md:grid-cols-4">
          {alibabaStore.profileImages.map((src) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden rounded border border-zinc-200">
              <Image src={src} alt="" fill className="object-cover" unoptimized />
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-[#f5f5f5] py-8 text-center">
        <p className="text-sm text-zinc-600">{company.legalName}</p>
        <a href={company.alibabaStoreUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-[#ff6a00] hover:underline">
          {t('visitAlibabaStore')} →
        </a>
      </section>
    </div>
  )
}
