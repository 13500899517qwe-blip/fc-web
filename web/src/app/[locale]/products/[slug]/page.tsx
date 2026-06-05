import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'
import { ProductImage } from '@/components/catalog/ProductImage'
import { ProductCard } from '@/components/catalog/ProductCard'
import { ProductSpecsTable } from '@/components/catalog/ProductSpecsTable'
import { Breadcrumbs } from '@/components/catalog/Breadcrumbs'
import { AddToInquiryButton } from '@/components/inquiry/AddToInquiryButton'
import { getProductBySlug, findRelatedProducts } from '@/lib/catalog-queries'
import { company } from '@/lib/company'
import { getPriceHint } from '@/lib/alibaba-store-data'

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations('products')
  const tc = await getTranslations('catalog')

  const product = await getProductBySlug(locale as AppLocale, slug).catch(() => null)
  if (!product) notFound()

  const related = await findRelatedProducts(locale as AppLocale, product).catch(() => [])
  const hint = getPriceHint(product.sku)

  return (
    <div className="bg-[#f5f5f5]">
      <div className="mx-auto max-w-[1200px] px-4 py-8">
        <Breadcrumbs
          items={[
            { label: t('title'), href: '/products' },
            ...(product.categories[0]
              ? [{ label: product.categories[0].title, href: `/products/category/${product.categories[0].slug}` }]
              : []),
            { label: product.title },
          ]}
        />

        <div className="mt-6 grid gap-8 rounded border border-zinc-200 bg-white p-6 lg:grid-cols-2">
          <ProductImage
            src={product.imageUrl}
            alt={product.imageAlt}
            className="aspect-square w-full"
            sizes="(max-width:1024px) 100vw, 50vw"
            priority
          />

          <div>
            <h1 className="text-lg font-bold leading-snug text-zinc-900 md:text-xl">{product.title}</h1>
            <p className="mt-2 font-mono text-sm text-zinc-500">{t('sku')}: {product.sku}</p>
            <p className="mt-3 text-2xl font-bold text-[#ff6a00]">{hint.price}</p>
            <p className="text-sm text-zinc-500">{hint.moq}</p>
            {product.summary && <p className="mt-4 text-sm text-zinc-700">{product.summary}</p>}
            {product.description && (
              <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-zinc-600">{product.description}</div>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <AddToInquiryButton sku={product.sku} title={product.title} />
              <Link href="/inquiry" className="rounded border border-[#ff6a00] px-5 py-2.5 text-sm font-semibold text-[#ff6a00] hover:bg-orange-50">
                {tc('requestQuote')}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <ProductSpecsTable
            specs={product.specs}
            partNumber={product.partNumber}
            vehicleBrands={product.vehicleBrands}
            sku={product.sku}
            labels={{ specs: t('specs'), partNumber: t('partNumber'), brands: t('brands'), sku: t('sku') }}
          />
        </div>

        {related.length > 0 && (
          <section className="mt-10 rounded border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-bold text-zinc-900">{t('related')}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        <p className="mt-8 text-center text-xs text-zinc-500">
          {tc('alibabaMore')}{' '}
          <a href={company.alibabaStoreUrl} target="_blank" rel="noopener noreferrer" className="text-[#ff6a00] hover:underline">
            {company.brandShort} on Alibaba
          </a>
        </p>
      </div>
    </div>
  )
}
