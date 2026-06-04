import type { CollectionConfig } from 'payload'
import { translateProductHook } from '@/hooks/translateProduct'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['sku', 'title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'sku',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'partNumber',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'specs',
      type: 'textarea',
      admin: { description: 'Not auto-translated (e.g. 7"; 12V; H4)' },
    },
    {
      name: 'vehicleBrands',
      type: 'text',
      admin: { description: 'Semicolon-separated, not auto-translated' },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  hooks: {
    afterChange: [translateProductHook],
  },
}
