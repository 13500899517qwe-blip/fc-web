import type { AppLocale } from '@/i18n/routing'
import { company } from './company'

export function jsonLdOrganization(locale: AppLocale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.brandName,
    legalName: company.legalName,
    alternateName: company.brandShort,
    description: company.tagline,
    url: 'https://web-silk-zeta-71.vercel.app',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Danyang',
      addressRegion: 'Jiangsu',
      addressCountry: 'CN',
    },
    foundingDate: '2025',
    numberOfEmployees: company.employees,
    areaServed: ['North America', 'Western Europe', 'Middle East', 'Southeast Asia'],
    hasCertification: company.certifications.map((c) => ({
      '@type': 'Certification',
      name: c,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      ratingCount: '1500+',
    },
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: 'Auto Body Parts & Modified Lights',
        description: 'Bumpers, body kits, hoods, grilles, fenders, doors, tailgates, headlights, tail lights',
      },
    },
  }
}

export function jsonLdProduct(product: {
  title: string
  sku: string
  description?: string
  imageUrl?: string | null
  vehicleBrands?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    sku: product.sku,
    description: product.description || product.title,
    image: product.imageUrl || undefined,
    brand: {
      '@type': 'Brand',
      name: company.brandName,
    },
    manufacturer: {
      '@type': 'Organization',
      name: company.legalName,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    ...(product.vehicleBrands
      ? {
          vehicleInteriorColor: product.vehicleBrands,
        }
      : {}),
  }
}
