import type { AppLocale } from '@/i18n/routing'

const DEEPL_LOCALES = new Set(['fr', 'de', 'es', 'pt'])

/** Fields that must never be machine-translated */
export const NON_TRANSLATABLE_KEYS = new Set([
  'sku',
  'partNumber',
  'slug',
  'specs',
  'vehicleBrands',
])

export async function translateText(
  text: string,
  targetLocale: AppLocale,
  sourceLocale: AppLocale = 'en',
): Promise<string> {
  if (!text?.trim() || targetLocale === sourceLocale) return text

  const deeplKey = process.env.DEEPL_API_KEY
  if (deeplKey && DEEPL_LOCALES.has(targetLocale)) {
    try {
      const target = targetLocale === 'pt' ? 'PT' : targetLocale.toUpperCase()
      const res = await fetch('https://api-free.deepl.com/v2/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          auth_key: deeplKey,
          text,
          source_lang: 'EN',
          target_lang: target,
        }),
      })
      if (res.ok) {
        const data = (await res.json()) as { translations?: { text: string }[] }
        return data.translations?.[0]?.text ?? text
      }
    } catch {
      /* fall through */
    }
  }

  const googleKey = process.env.GOOGLE_TRANSLATE_API_KEY
  if (googleKey) {
    try {
      const res = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${googleKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: text,
            source: sourceLocale,
            target: targetLocale,
            format: 'text',
          }),
        },
      )
      if (res.ok) {
        const data = (await res.json()) as {
          data?: { translations?: { translatedText: string }[] }
        }
        return data.data?.translations?.[0]?.translatedText ?? text
      }
    } catch {
      /* fall through */
    }
  }

  return text
}

export async function translateLocalizedField(
  value: string | undefined,
  locale: AppLocale,
): Promise<string | undefined> {
  if (!value) return value
  return translateText(value, locale)
}
