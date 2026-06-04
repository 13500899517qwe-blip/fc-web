import type { CollectionConfig } from 'payload'

export const SiteContent: CollectionConfig = {
  slug: 'site-content',
  admin: {
    useAsTitle: 'key',
  },
  fields: [
    {
      name: 'key',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'About', value: 'about' },
        { label: 'FAQ', value: 'faq' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'body',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'faqItems',
      type: 'array',
      admin: { condition: (_, siblingData) => siblingData?.key === 'faq' },
      fields: [
        { name: 'question', type: 'text', localized: true },
        { name: 'answer', type: 'textarea', localized: true },
      ],
    },
  ],
}
