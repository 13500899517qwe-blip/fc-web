import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'
import { ProductImage } from '@/components/catalog/ProductImage'
import { ProductCard } from '@/components/catalog/ProductCard'
import { ProductSpecsTable } from '@/components/catalog/ProductSpecsTable'
import { Breadcrumbs } from '@/components/catalog/Breadcrumbs'
import { QuickQuoteForm } from '@/components/catalog/QuickQuoteForm'
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
    <div className="bg-surface-muted">
      <div className="container-main py-8">
        <Breadcrumbs
          items={[
            { label: t('title'), href: '/products' },
            ...(product.categories[0]
              ? [{ label: product.categories[0].title, href: `/products/category/${product.categories[0].slug}` }]
              : []),
            { label: product.title },
          ]}
        />

        {/* Product main section */}
        <div className="mt-6 grid gap-8 rounded-xl border border-border-light bg-surface p-6 shadow-card lg:grid-cols-2">
          <ProductImage
            src={product.imageUrl}
            alt={product.imageAlt}
            className="aspect-square w-full rounded-lg"
            sizes="(max-width:1024px) 100vw, 50vw"
            priority
          />

          <div className="flex flex-col">
            <h1 className="text-lg font-bold leading-snug text-text-primary md:text-xl">{product.title}</h1>
            <p className="mt-2 font-mono text-sm text-text-tertiary">{t('sku')}: {product.sku}</p>

            <div className="mt-4">
              <p className="text-2xl font-bold text-brand">{hint.price}</p>
              <p className="mt-0.5 text-sm text-text-tertiary">{hint.moq}</p>
            </div>

            {product.summary && (
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">{product.summary}</p>
            )}
            {product.description && (
              <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-text-secondary">
                {product.description}
              </div>
            )}

            <div className="mt-auto flex flex-wrap gap-3 pt-6">
              <AddToInquiryButton sku={product.sku} title={product.title} />
              <Link
                href="/inquiry"
                className="inline-flex items-center gap-2 rounded-lg border border-brand/30 bg-surface px-5 py-2.5 text-sm font-semibold text-brand transition-all hover:bg-brand/5 active:scale-[0.97]"
              >
                {tc('requestQuote')}
              </Link>
            </div>
          </div>
        </div>

        {/* Specs + Quick Quote side by side */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProductSpecsTable
              specs={product.specs}
              partNumber={product.partNumber}
              vehicleBrands={product.vehicleBrands}
              sku={product.sku}
              labels={{ specs: t('specs'), partNumber: t('partNumber'), brands: t('brands'), sku: t('sku') }}
            />
          </div>
          <div>
            <QuickQuoteForm sku={product.sku} title={product.title} />
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-10 rounded-xl border border-border-light bg-surface p-6 shadow-card">
            <h2 className="text-lg font-bold text-text-primary">{t('related')}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Footer link */}
        <p className="mt-10 text-center text-xs text-text-muted">
          {tc('alibabaMore')}{' '}
          <a
            href={company.alibabaStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand transition-colors hover:text-brand-dark"
          >
            {company.brandShort} on Alibaba
          </a>
        </p>
      </div>
    </div>
  )
}
