export function buildProductsHref(options: {
  categorySlug?: string
  brand?: string
  q?: string
  page?: number
}): string {
  const { categorySlug, brand, q, page } = options
  const base = categorySlug ? `/products/category/${categorySlug}` : '/products'
  const params = new URLSearchParams()
  if (brand) params.set('brand', brand)
  if (q) params.set('q', q)
  if (page && page > 1) params.set('page', String(page))
  const qs = params.toString()
  return qs ? `${base}?${qs}` : base
}
