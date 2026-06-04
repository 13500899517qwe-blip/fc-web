import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    description:
      'Local uploads work in dev. On Vercel, use Vercel Blob for persistent images (see docs/PRODUCTION-CHECKLIST.md).',
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
    },
  ],
}
