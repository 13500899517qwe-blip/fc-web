import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getPayload } from '@/lib/payload'
import type { AppLocale } from '@/i18n/routing'
import { AddToInquiryButton } from '@/components/inquiry/AddToInquiryButton'

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations('products')

  let product: {
    sku: string
    title: string
    partNumber?: string
    summary?: string
    description?: string
    specs?: string
    vehicleBrands?: string
  } | null = null

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'products',
      locale: locale as AppLocale,
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })
    const doc = result.docs[0]
    if (!doc) notFound()
    product = {
      sku: doc.sku as string,
      title: doc.title as string,
      partNumber: doc.partNumber as string | undefined,
      summary: doc.summary as string | undefined,
      description: doc.description as string | undefined,
      specs: doc.specs as string | undefined,
      vehicleBrands: doc.vehicleBrands as string | undefined,
    }
  } catch {
    notFound()
  }

  if (!product) notFound()

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="font-mono text-sm text-zinc-500">
        {t('sku')}: {product.sku}
      </p>
      <h1 className="mt-2 text-3xl font-bold">{product.title}</h1>
      <p className="mt-2 text-sm text-amber-800">{t('noPrice')}</p>
      {product.partNumber && (
        <p className="mt-4 text-sm">
          <span className="font-semibold">{t('partNumber')}:</span> {product.partNumber}
        </p>
      )}
      {product.summary && <p className="mt-4 text-zinc-700">{product.summary}</p>}
      {product.description && (
        <div className="mt-6 whitespace-pre-wrap text-zinc-700">{product.description}</div>
      )}
      {product.specs && (
        <div className="mt-6 rounded-lg bg-zinc-100 p-4">
          <p className="font-semibold">{t('specs')}</p>
          <p className="mt-1 font-mono text-sm">{product.specs}</p>
        </div>
      )}
      {product.vehicleBrands && (
        <p className="mt-4 text-sm">
          <span className="font-semibold">{t('brands')}:</span> {product.vehicleBrands}
        </p>
      )}
      <div className="mt-8">
        <AddToInquiryButton sku={product.sku} title={product.title} />
      </div>
    </div>
  )
}
