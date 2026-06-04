import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ProductImage } from '@/components/catalog/ProductImage'
import { AddToInquiryButton } from '@/components/inquiry/AddToInquiryButton'
import type { ProductListItem } from '@/lib/catalog-queries'

type Props = { product: ProductListItem }

export async function ProductCard({ product }: Props) {
  const t = await getTranslations('products')

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="block">
        <ProductImage src={product.imageUrl} alt={product.imageAlt} />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link
          href={`/products/${product.slug}`}
          className="font-semibold text-zinc-900 group-hover:text-blue-800 line-clamp-2"
        >
          {product.title}
        </Link>
        <p className="mt-1 font-mono text-xs text-zinc-500">{product.sku}</p>
        {product.vehicleBrands && (
          <p className="mt-1 text-xs text-zinc-600 line-clamp-1">{product.vehicleBrands}</p>
        )}
        {product.summary && (
          <p className="mt-2 flex-1 text-sm text-zinc-600 line-clamp-2">{product.summary}</p>
        )}
        <p className="mt-2 text-xs font-medium text-amber-800">{t('noPrice')}</p>
        <div className="mt-4">
          <AddToInquiryButton sku={product.sku} title={product.title} />
        </div>
      </div>
    </article>
  )
}
