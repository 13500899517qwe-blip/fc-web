import type { CollectionAfterChangeHook } from 'payload'
import { locales, type AppLocale } from '@/i18n/routing'
import { translateText } from '@/lib/translate'

const LOCALIZED_PRODUCT_FIELDS = ['title', 'summary', 'description'] as const

export const translateProductHook: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
}) => {
  if (req.context?.skipTranslateHook) return doc
  if (!process.env.GOOGLE_TRANSLATE_API_KEY && !process.env.DEEPL_API_KEY) return doc

  const payload = req.payload
  const sourceLocale: AppLocale = 'en'

  for (const locale of locales) {
    if (locale === sourceLocale) continue

    const updates: Record<string, string> = {}

    for (const field of LOCALIZED_PRODUCT_FIELDS) {
      const sourceValue = doc[field] as string | undefined
      if (!sourceValue?.trim()) continue

      const existing = await payload.findByID({
        collection: 'products',
        id: doc.id,
        locale,
        depth: 0,
      })

      const current = existing?.[field] as string | undefined
      if (current?.trim()) continue

      updates[field] = await translateText(sourceValue, locale, sourceLocale)
    }

    if (Object.keys(updates).length > 0) {
      await payload.update({
        collection: 'products',
        id: doc.id,
        locale,
        data: updates,
        depth: 0,
        context: { skipTranslateHook: true },
      })
    }
  }

  return doc
}
