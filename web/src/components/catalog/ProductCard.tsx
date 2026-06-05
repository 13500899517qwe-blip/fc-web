import { getTranslations } from 'next-intl/server'
import { AlibabaProductCard } from '@/components/catalog/AlibabaProductCard'

type Props = { product: { id: string; sku: string; title: string; slug: string; imageUrl: string | null } }

export async function ProductCard({ product }: Props) {
  return (
    <AlibabaProductCard
      slug={product.slug}
      sku={product.sku}
      title={product.title}
      imageUrl={product.imageUrl}
    />
  )
}
