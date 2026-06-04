import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'company', 'locale', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'company', type: 'text' },
    { name: 'phone', type: 'text' },
    { name: 'country', type: 'text' },
    { name: 'message', type: 'textarea' },
    {
      name: 'locale',
      type: 'text',
      admin: { description: 'Site language when submitted' },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'sku', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'quantity', type: 'number', defaultValue: 1 },
      ],
    },
    {
      name: 'turnstileVerified',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
