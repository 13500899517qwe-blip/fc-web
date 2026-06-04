import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'
import { ProductImage } from '@/components/catalog/ProductImage'
import { Breadcrumbs } from '@/components/catalog/Breadcrumbs'
import { AddToInquiryButton } from '@/components/inquiry/AddToInquiryButton'
import { getProductBySlug } from '@/lib/catalog-queries'
import { company } from '@/lib/company'

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations('products')
  const tc = await getTranslations('catalog')

  const product = await getProductBySlug(locale as AppLocale, slug).catch(() => null)
  if (!product) notFound()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs
        items={[
          { label: t('title'), href: '/products' },
          ...(product.categories[0]
            ? [
                {
                  label: product.categories[0].title,
                  href: `/products/category/${product.categories[0].slug}`,
                },
              ]
            : []),
          { label: product.title },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <ProductImage
            src={product.imageUrl}
            alt={product.imageAlt}
            className="aspect-square max-h-[480px] w-full"
            sizes="(max-width:1024px) 100vw, 50vw"
            priority
          />
          {!product.imageUrl && (
            <p className="border-t border-zinc-100 px-4 py-3 text-center text-xs text-zinc-500">
              {tc('imagePending')}
            </p>
          )}
        </div>

        <div>
          <p className="font-mono text-sm text-zinc-500">
            {t('sku')}: {product.sku}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-zinc-900">{product.title}</h1>
          <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900">
            {t('noPrice')}
          </p>

          {product.partNumber && (
            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
              <dt className="font-semibold text-zinc-500">{t('partNumber')}</dt>
              <dd>{product.partNumber}</dd>
            </dl>
          )}
          {product.vehicleBrands && (
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
              <dt className="font-semibold text-zinc-500">{t('brands')}</dt>
              <dd>{product.vehicleBrands}</dd>
            </dl>
          )}
          {product.summary && <p className="mt-6 text-zinc-700">{product.summary}</p>}
          {product.description && (
            <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-zinc-600">
              {product.description}
            </div>
          )}
          {product.specs && (
            <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm font-semibold text-zinc-800">{t('specs')}</p>
              <p className="mt-2 font-mono text-sm text-zinc-700">{product.specs}</p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <AddToInquiryButton sku={product.sku} title={product.title} />
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold hover:bg-zinc-50"
            >
              {tc('requestQuote')}
            </Link>
          </div>

          <p className="mt-8 text-xs text-zinc-500">
            {tc('alibabaMore')}{' '}
            <a
              href={company.alibabaStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              {company.brandShort} on Alibaba
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
