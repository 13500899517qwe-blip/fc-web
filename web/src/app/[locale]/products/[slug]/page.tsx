import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ProductGallery } from '@/components/catalog/ProductGallery'
import { ProductImage } from '@/components/catalog/ProductImage'
import { ProductSpecsTable } from '@/components/catalog/ProductSpecsTable'
import { Breadcrumbs } from '@/components/catalog/Breadcrumbs'
import { QuickQuoteForm } from '@/components/catalog/QuickQuoteForm'
import { AddToInquiryButton } from '@/components/inquiry/AddToInquiryButton'
import { company } from '@/lib/company'
import { findProductByAnySlug, type ProductRecord } from '@/data/products-database'
import { getCatalog, type CatalogEntry } from '@/data/catalog-database'
import { Hash, ShieldCheck, Truck, Award } from 'lucide-react'

function slug_(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }

/** 3-tier lookup: detailed → catalog slug match → not found */
function resolveProduct(urlSlug: string): ProductRecord | null {
  // Tier 1: detailed product database
  const detailed = findProductByAnySlug(urlSlug)
  if (detailed) return detailed

  // Tier 2: lightweight catalog
  const all = getCatalog()
  const entry: CatalogEntry | undefined =
    all.find(e => e.sku === urlSlug) ??
    all.find(e => {
      const ts = slug_(e.title)
      return urlSlug.includes(ts) || ts.includes(urlSlug)
    })

  if (!entry) return null

  return {
    sku: entry.sku,
    title: entry.title,
    slug: entry.sku,
    vehicleBrand: entry.vehicleBrand,
    category: entry.category,
    priceRange: entry.priceRange,
    moq: entry.moq,
    gallery: [],
    specs: {},
    featured: false,
  }
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations('products')
  const tc = await getTranslations('catalog')

  const product = resolveProduct(slug)
  if (!product) notFound()

  const { title, sku, partNumber, vehicleBrand, gallery, specs, priceRange, moq } = product
  const hint = { price: priceRange || 'Contact for price', moq: moq || 'Min. Order negotiable' }
  const hasOem = !!partNumber
  const specsString = specs && Object.keys(specs).length > 0
    ? Object.entries(specs).map(([k, v]) => `${k}: ${v}`).join('; ')
    : null

  return (
    <div className="bg-surface-muted">
      <div className="container-main py-8">
        <Breadcrumbs items={[{ label: t('title'), href: '/products' }, { label: title }]} />

        <div className="mt-6 grid gap-8 rounded-xl border border-border-light bg-surface p-6 shadow-card lg:grid-cols-2">
          {gallery.length > 1 ? (
            <ProductGallery images={gallery} alt={title} className="aspect-square w-full" />
          ) : (
            <ProductImage src={gallery[0] || null} alt={title} className="aspect-square w-full rounded-lg" sizes="(max-width:1024px) 100vw, 50vw" priority />
          )}

          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-lg font-bold leading-snug text-text-primary md:text-xl">{title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm text-text-tertiary">{t('sku')}: {sku}</span>
                {hasOem && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand">
                    <Hash className="h-3 w-3" />OEM: {partNumber}
                  </span>
                )}
                {vehicleBrand && (
                  <span className="rounded-full bg-surface-subtle px-2.5 py-0.5 text-xs font-medium text-text-secondary">{vehicleBrand}</span>
                )}
              </div>
            </div>

            <div className="rounded-lg bg-surface-subtle p-4">
              <p className="text-2xl font-bold text-brand">{hint.price}</p>
              {hint.moq && <p className="mt-0.5 text-sm text-text-tertiary">{hint.moq}</p>}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: ShieldCheck, label: 'Quality Guaranteed', value: 'IATF16949 / ISO' },
                { icon: Truck, label: 'Factory Direct', value: '23,575㎡ facility' },
                { icon: Award, label: 'SGS Verified', value: 'Supplier assessed' },
                { icon: Hash, label: 'OEM/ODM', value: 'Customization available' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-2 rounded-lg border border-border-light bg-surface p-2.5">
                  <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
                  <div>
                    <p className="text-xs font-semibold text-text-primary">{label}</p>
                    <p className="text-[11px] text-text-tertiary">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap gap-3 pt-4">
              <AddToInquiryButton sku={sku} title={title} />
              <Link href="/inquiry" className="inline-flex items-center gap-2 rounded-lg border border-brand/30 bg-surface px-5 py-2.5 text-sm font-semibold text-brand transition-all hover:bg-brand/5 active:scale-[0.97]">{tc('requestQuote')}</Link>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProductSpecsTable
              specs={specsString}
              partNumber={partNumber}
              vehicleBrands={vehicleBrand}
              sku={sku}
              labels={{ specs: t('specs'), partNumber: t('partNumber'), brands: t('brands'), sku: t('sku') }}
            />
          </div>
          <div><QuickQuoteForm sku={sku} title={title} /></div>
        </div>

        <p className="mt-10 text-center text-xs text-text-muted">
          {tc('alibabaMore')}{' '}
          <a href={company.alibabaStoreUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand transition-colors hover:text-brand-dark">{company.brandShort} on Alibaba</a>
        </p>
      </div>
    </div>
  )
}
