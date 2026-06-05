import { getAlibabaImageUrl } from '@/lib/alibaba-images'

type MediaDoc = { url?: string | null; alt?: string | null }

function isUsableImageUrl(url: string): boolean {
  if (url.startsWith('http')) return true
  // Payload local file URLs are not available on Vercel serverless (no filesystem).
  if (url.startsWith('/api/media/')) return false
  return false
}

export function getMediaUrl(media: MediaDoc | number | null | undefined): string | null {
  if (!media || typeof media === 'number') return null
  if (media.url && isUsableImageUrl(media.url)) return media.url
  return null
}

/** Prefer uploaded media; fall back to stored source URL or scraped Alibaba CDN. */
export function resolveProductImageUrl(
  media: MediaDoc | number | null | undefined,
  sku: string,
  sourceImageUrl?: string | null,
): string | null {
  return getMediaUrl(media) ?? sourceImageUrl ?? getAlibabaImageUrl(sku)
}

export function getMediaAlt(media: MediaDoc | number | null | undefined, fallback: string): string {
  if (!media || typeof media === 'number') return fallback
  return media.alt || fallback
}
