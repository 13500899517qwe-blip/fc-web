import type { MetadataRoute } from 'next'
import { locales } from '@/i18n/routing'

const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const paths = ['', '/products', '/about', '/faq', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  for (const locale of locales) {
    for (const p of paths) {
      entries.push({
        url: `${base}/${locale}${p}`,
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${base}/${l}${p}`]),
          ),
        },
      })
    }
  }
  return entries
}
