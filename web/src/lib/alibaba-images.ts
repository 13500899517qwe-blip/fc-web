import alibabaData from '../../public/data/alibaba-products.json'

type AlibabaProduct = { aliId: string; image?: string | null }

const imageBySku = new Map<string, string>(
  (alibabaData.products as AlibabaProduct[])
    .filter((p) => p.image)
    .map((p) => [`ALI-${p.aliId}`, p.image!]),
)

/** Fallback image URL from scraped Alibaba data when Payload media is not attached yet. */
export function getAlibabaImageUrl(sku: string): string | null {
  return imageBySku.get(sku) ?? null
}
