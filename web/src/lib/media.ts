type MediaDoc = { url?: string | null; alt?: string | null }

export function getMediaUrl(media: MediaDoc | number | null | undefined): string | null {
  if (!media || typeof media === 'number') return null
  if (media.url) return media.url
  return null
}

export function getMediaAlt(media: MediaDoc | number | null | undefined, fallback: string): string {
  if (!media || typeof media === 'number') return fallback
  return media.alt || fallback
}
