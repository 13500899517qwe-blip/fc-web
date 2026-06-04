import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPayload } from '@/lib/payload'
import type { AppLocale } from '@/i18n/routing'
import { ProductCard } from '@/components/catalog/ProductCard'
import { CatalogEmpty } from '@/components/catalog/CatalogEmpty'
import { findProducts, getCategoryTree } from '@/lib/catalog-queries'
import { buildProductsHref } from '@/lib/catalog-url'
import { company } from '@/lib/company'
import {
  Factory,
  Globe,
  Layers,
  ShieldCheck,
  Truck,
  Wrench,
} from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('home')
  const tc = await getTranslations('catalog')

  let featured: Awaited<ReturnType<typeof findProducts>>['docs'] = []
  let categoryTree = await getCategoryTree(locale as AppLocale).catch(() => [])

  try {
    categoryTree = await getCategoryTree(locale as AppLocale)
    const result = await findProducts({
      locale: locale as AppLocale,
      limit: 8,
      page: 1,
    })
    const payload = await getPayload()
    const featuredResult = await payload.find({
      collection: 'products',
      locale: locale as AppLocale,
      limit: 8,
      where: { featured: { equals: true } },
      depth: 1,
    })
    if (featuredResult.docs.length > 0) {
      featured = featuredResult.docs.map((doc) => {
        const image = doc.image as { url?: string } | number | null
        return {
          id: String(doc.id),
          sku: doc.sku as string,
          title: doc.title as string,
          slug: doc.slug as string,
          summary: doc.summary as string | undefined,
          imageUrl:
            image && typeof image === 'object' && image.url ? image.url : null,
          imageAlt: doc.title as string,
        }
      })
    } else {
      featured = result.docs.slice(0, 8)
    }
  } catch {
    /* DB not ready */
  }

  const trust = [
    { icon: Factory, text: t('trustFloorspace') },
    { icon: ShieldCheck, text: t('trustRating') },
    { icon: Truck, text: t('trustDelivery') },
    { icon: Globe, text: t('trustResponse') },
  ]

  const advantages = [
    { icon: Layers, title: t('advantage1Title'), desc: t('advantage1') },
    { icon: Wrench, title: t('advantage2Title'), desc: t('advantage2') },
    { icon: ShieldCheck, title: t('advantage3Title'), desc: t('advantage3') },
  ]

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
            {company.legalName}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {t('heroTitle')}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">{t('heroSubtitle')}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-lg bg-blue-600 px-8 py-3.5 font-semibold shadow-lg hover:bg-blue-500"
            >
              {t('ctaProducts')}
            </Link>
            <Link
              href="/inquiry"
              className="rounded-lg border border-white/25 bg-white/5 px-8 py-3.5 font-semibold backdrop-blur hover:bg-white/10"
            >
              {t('ctaInquiry')}
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white/25 px-8 py-3.5 font-semibold hover:bg-white/10"
            >
              {t('ctaContact')}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-zinc-500">
            {t('trustTitle')}
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {trust.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex flex-col items-center rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-5 text-center"
              >
                <Icon className="h-8 w-8 text-blue-800" />
                <span className="mt-2 text-sm font-medium text-zinc-800">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">{t('shopByCategory')}</h2>
            <p className="mt-1 text-sm text-zinc-600">{t('shopByCategorySub')}</p>
          </div>
          <Link href="/products" className="text-sm font-semibold text-blue-800 hover:underline">
            {t('viewAll')}
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTree.map((cat) => (
            <Link
              key={cat.id}
              href={buildProductsHref({ categorySlug: cat.slug })}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-zinc-900 group-hover:text-blue-800">
                {cat.title}
              </h3>
              <ul className="mt-3 space-y-1 text-sm text-zinc-600">
                {cat.children.slice(0, 4).map((c) => (
                  <li key={c.id}>{c.title}</li>
                ))}
              </ul>
              <span className="mt-4 inline-block text-sm font-medium text-blue-700">
                {tc('browseCategory')} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-100/80">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-bold">{t('featured')}</h2>
          <p className="mt-1 text-sm text-zinc-600">{t('featuredSub')}</p>
          {featured.length === 0 ? (
            <div className="mt-8">
              <CatalogEmpty variant="all" />
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold">{t('advantagesTitle')}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {advantages.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <Icon className="h-10 w-10 text-blue-800" />
              <h3 className="mt-4 font-semibold text-zinc-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold">{t('ctaBlockTitle')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-blue-200">{t('ctaBlockSub')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/inquiry"
              className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-950 hover:bg-blue-50"
            >
              {t('ctaInquiry')}
            </Link>
            <a
              href={company.alibabaStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/30 px-8 py-3 font-semibold hover:bg-white/10"
            >
              {tc('viewAlibaba')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
