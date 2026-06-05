import type { Where } from 'payload'
import { getPayload } from '@/lib/payload'
import { buildCategoryTree, type CategoryNode } from '@/lib/catalog'
import type { AppLocale } from '@/i18n/routing'
import { resolveProductImageUrl } from '@/lib/media'
type MediaDoc = { url?: string | null; alt?: string | null }

export type ProductListItem = {
  id: string
  sku: string
  title: string
  slug: string
  summary?: string
  partNumber?: string
  vehicleBrands?: string
  categoryTitle?: string
  imageUrl: string | null
  imageAlt: string
}

export type ProductFilters = {
  locale: AppLocale
  categorySlug?: string
  brand?: string
  q?: string
  page?: number
  limit?: number
}

export async function getCategoryTree(locale: AppLocale): Promise<CategoryNode[]> {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'categories',
    locale,
    limit: 200,
    depth: 0,
    sort: 'level',
  })
  const flat = result.docs.map((doc) => ({
    id: doc.id as number,
    title: doc.title as string,
    slug: doc.slug as string,
    level: doc.level as '1' | '2' | '3',
    parent: doc.parent as number | { id: number } | null | undefined,
  }))
  return buildCategoryTree(flat)
}

export async function getCategoryBySlug(
  locale: AppLocale,
  slug: string,
): Promise<{ id: number; title: string; slug: string; level: string } | null> {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'categories',
    locale,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })
  const doc = result.docs[0]
  if (!doc) return null
  return {
    id: doc.id as number,
    title: doc.title as string,
    slug: doc.slug as string,
    level: doc.level as string,
  }
}

export async function findProducts(filters: ProductFilters): Promise<{
  docs: ProductListItem[]
  totalDocs: number
  totalPages: number
  page: number
}> {
  const payload = await getPayload()
  const page = filters.page ?? 1
  const limit = filters.limit ?? 24

  const and: Where[] = []

  if (filters.categorySlug) {
    const cat = await getCategoryBySlug(filters.locale, filters.categorySlug)
    if (cat) {
      and.push({ categories: { in: [cat.id] } })
    }
  }

  if (filters.brand) {
    and.push({ vehicleBrands: { contains: filters.brand } })
  }

  if (filters.q?.trim()) {
    const q = filters.q.trim()
    and.push({
      or: [{ title: { contains: q } }, { sku: { contains: q } }, { partNumber: { contains: q } }],
    })
  }

  const result = await payload.find({
    collection: 'products',
    locale: filters.locale,
    page,
    limit,
    depth: 1,
    where: and.length > 0 ? { and } : undefined,
    sort: '-updatedAt',
  })

  const docs: ProductListItem[] = result.docs.map((doc) => {
    const image = doc.image as MediaDoc | number | null | undefined
    const sku = doc.sku as string
    const categories = Array.isArray(doc.categories)
      ? doc.categories.filter((c): c is Exclude<typeof c, number> => typeof c === 'object' && c !== null)
      : []
    return {
      id: String(doc.id),
      sku,
      title: doc.title as string,
      slug: doc.slug as string,
      summary: doc.summary as string | undefined,
      partNumber: doc.partNumber as string | undefined,
      vehicleBrands: doc.vehicleBrands as string | undefined,
      categoryTitle: categories[0]?.title as string | undefined,
      imageUrl: resolveProductImageUrl(image, sku, doc.sourceImageUrl as string | undefined),
      imageAlt: doc.title as string,
    }
  })

  return {
    docs,
    totalDocs: result.totalDocs,
    totalPages: result.totalPages,
    page: result.page ?? page,
  }
}

export async function findRelatedProducts(
  locale: AppLocale,
  product: { id: string; slug: string; categories: { slug: string }[]; vehicleBrands?: string },
  limit = 4,
): Promise<ProductListItem[]> {
  const categorySlug = product.categories[0]?.slug
  const result = await findProducts({
    locale,
    categorySlug,
    brand: product.vehicleBrands?.split(/[;,]/)[0]?.trim(),
    limit: limit + 2,
  })
  return result.docs.filter((d) => d.slug !== product.slug).slice(0, limit)
}

export async function getProductBySlug(locale: AppLocale, slug: string) {
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'products',
    locale,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  const doc = result.docs[0]
  if (!doc) return null

  const image = doc.image as MediaDoc | number | null | undefined
  const sku = doc.sku as string
  const categories = Array.isArray(doc.categories)
    ? doc.categories
        .filter((c): c is Exclude<typeof c, number> => typeof c === 'object' && c !== null)
        .map((c) => ({ title: c.title as string, slug: c.slug as string }))
    : []

  return {
    id: String(doc.id),
    sku,
    title: doc.title as string,
    slug: doc.slug as string,
    partNumber: doc.partNumber as string | undefined,
    summary: doc.summary as string | undefined,
    description: doc.description as string | undefined,
    specs: doc.specs as string | undefined,
    vehicleBrands: doc.vehicleBrands as string | undefined,
    imageUrl: resolveProductImageUrl(image, sku, doc.sourceImageUrl as string | undefined),
    imageAlt: doc.title as string,
    categories,
  }
}
