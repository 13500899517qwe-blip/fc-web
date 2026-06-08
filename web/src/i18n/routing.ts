import { defineRouting } from 'next-intl/routing'

export const locales = ['en', 'fr', 'de', 'es', 'ru', 'ja', 'ar', 'pt', 'zh'] as const
export type AppLocale = (typeof locales)[number]

export const defaultLocale: AppLocale = 'en'

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
})

export const localeLabels: Record<AppLocale, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
  ru: 'Русский',
  ja: '日本語',
  ar: 'العربية',
  pt: 'Português',
  zh: '中文',
}

export const rtlLocales: AppLocale[] = ['ar']
