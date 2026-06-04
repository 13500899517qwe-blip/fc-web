import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { locales, type AppLocale } from '../src/i18n/routing'
import { translateText } from '../src/lib/translate'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const messagesDir = path.resolve(__dirname, '../src/i18n/messages')

async function translateObject(
  obj: Record<string, unknown>,
  locale: AppLocale,
): Promise<Record<string, unknown>> {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      out[key] = await translateText(value, locale)
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      out[key] = await translateObject(value as Record<string, unknown>, locale)
    } else {
      out[key] = value
    }
  }
  return out
}

async function main() {
  const en = JSON.parse(fs.readFileSync(path.join(messagesDir, 'en.json'), 'utf-8'))

  for (const locale of locales) {
    if (locale === 'en') continue
    console.log(`Translating UI: ${locale}`)
    const translated = await translateObject(en, locale)
    fs.writeFileSync(
      path.join(messagesDir, `${locale}.json`),
      `${JSON.stringify(translated, null, 2)}\n`,
    )
  }
  console.log('UI messages updated.')
}

main().catch(console.error)
