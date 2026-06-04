import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { locales, type AppLocale } from '../src/i18n/routing'
import { translateText } from '../src/lib/translate'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const materialsDir = path.resolve(__dirname, '../../网站资料')

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function seed() {
  const payload = await getPayload({ config })

  const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com'
  const password = process.env.SEED_ADMIN_PASSWORD || 'changeme123'

  const existingUsers = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (existingUsers.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: { email, password },
    })
    console.log(`Admin user: ${email} / ${password}`)
  }

  const treePath = path.join(materialsDir, '分类树.txt')
  const categoryMap = new Map<string, string>()

  if (fs.existsSync(treePath)) {
    const lines = fs.readFileSync(treePath, 'utf-8').split('\n')
    let parentL1: string | null = null
    let parentL2: string | null = null

    for (const raw of lines) {
      const line = raw.trim()
      if (!line) continue
      const indent = raw.match(/^\s*/)?.[0].length ?? 0

      if (indent === 0) {
        const slug = slugify(line)
        const doc = await payload.create({
          collection: 'categories',
          locale: 'en',
          data: { title: line, slug, level: '1' },
        })
        parentL1 = String(doc.id)
        categoryMap.set(line, parentL1)
        parentL2 = null
      } else if (indent <= 2 && parentL1) {
        const slug = slugify(line)
        const doc = await payload.create({
          collection: 'categories',
          locale: 'en',
          data: { title: line, slug, level: '2', parent: parentL1 },
        })
        parentL2 = String(doc.id)
        categoryMap.set(line, parentL2)
      } else if (parentL2) {
        const slug = slugify(line)
        const doc = await payload.create({
          collection: 'categories',
          locale: 'en',
          data: { title: line, slug, level: '3', parent: parentL2 },
        })
        categoryMap.set(line, String(doc.id))
      }
    }
  }

  const csvPath = path.join(materialsDir, '产品主数据.csv')
  if (fs.existsSync(csvPath)) {
    const rows = fs.readFileSync(csvPath, 'utf-8').trim().split('\n').slice(1)
    for (const row of rows) {
      const cols = row.split(',')
      if (cols.length < 8) continue
      const [sku, title, partNumber, cat1, cat2, brands, specs] = cols
      const slug = slugify(sku)
      const catIds: string[] = []
      if (cat2 && categoryMap.has(cat2)) catIds.push(categoryMap.get(cat2)!)
      else if (cat1 && categoryMap.has(cat1)) catIds.push(categoryMap.get(cat1)!)

      const existing = await payload.find({
        collection: 'products',
        where: { sku: { equals: sku } },
        limit: 1,
      })

      if (existing.docs.length > 0) continue

      const product = await payload.create({
        collection: 'products',
        locale: 'en',
        data: {
          sku,
          title,
          slug,
          partNumber: partNumber || undefined,
          summary: `${title} for B2B wholesale.`,
          description: `Contact us for specifications and OEM options for ${title}.`,
          specs,
          vehicleBrands: brands,
          categories: catIds,
          featured: true,
        },
        context: { skipTranslateHook: true },
      })

      for (const locale of locales) {
        if (locale === 'en') continue
        const updates: Record<string, string> = {}
        for (const field of ['title', 'summary', 'description'] as const) {
          const source = product[field] as string
          if (source) updates[field] = await translateText(source, locale as AppLocale)
        }
        await payload.update({
          collection: 'products',
          id: product.id,
          locale,
          data: updates,
          context: { skipTranslateHook: true },
        })
      }
      console.log(`Product: ${sku}`)
    }
  }

  const aboutBody =
    'LumaDrive LED manufactures automotive LED headlights, fog lights, and mounting brackets for global B2B buyers. We support OEM/ODM projects with stable quality and fast sampling.'

  for (const key of ['about', 'faq'] as const) {
    const found = await payload.find({
      collection: 'site-content',
      where: { key: { equals: key } },
      limit: 1,
    })
    if (found.docs.length > 0) continue

    const data =
      key === 'faq'
        ? {
            key,
            title: 'FAQ',
            faqItems: [
              {
                question: 'What is your MOQ?',
                answer: 'Standard MOQ is 50 sets per SKU.',
              },
              {
                question: 'Do you provide samples?',
                answer: 'Yes, samples ship in 3-5 business days.',
              },
              {
                question: 'OEM/ODM available?',
                answer: 'Yes, we support custom branding and packaging.',
              },
            ],
          }
        : { key, title: 'About Us', body: aboutBody }

    const doc = await payload.create({
      collection: 'site-content',
      locale: 'en',
      data,
    })

    for (const locale of locales) {
      if (locale === 'en') continue
      const translated: Record<string, unknown> = {}
      if (data.title) translated.title = await translateText(data.title, locale as AppLocale)
      if ('body' in data && data.body)
        translated.body = await translateText(data.body, locale as AppLocale)
      if ('faqItems' in data && data.faqItems) {
        translated.faqItems = await Promise.all(
          data.faqItems.map(async (item) => ({
            question: await translateText(item.question, locale as AppLocale),
            answer: await translateText(item.answer, locale as AppLocale),
          })),
        )
      }
      await payload.update({
        collection: 'site-content',
        id: doc.id,
        locale,
        data: translated,
      })
    }
  }

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
