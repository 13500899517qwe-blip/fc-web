import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { locales, type AppLocale } from '../src/i18n/routing'
import { translateText } from '../src/lib/translate'
import { company } from '../src/lib/company'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const materialsDir = path.resolve(__dirname, '../../网站资料')

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function parseFaqFile(content: string): { question: string; answer: string }[] {
  const items: { question: string; answer: string }[] = []
  const blocks = content.split(/\n(?=Q:)/)
  for (const block of blocks) {
    const q = block.match(/^Q:\s*(.+)/m)?.[1]?.trim()
    const a = block.match(/^A:\s*(.+)/m)?.[1]?.trim()
    if (q && a) items.push({ question: q, answer: a })
  }
  return items
}

async function clearCatalog(payload: Awaited<ReturnType<typeof getPayload>>) {
  for (const collection of ['products', 'categories', 'site-content'] as const) {
    const { docs } = await payload.find({ collection, limit: 500, depth: 0 })
    for (const doc of docs) {
      await payload.delete({ collection, id: doc.id })
    }
    console.log(`Cleared ${collection}: ${docs.length}`)
  }
}

async function seed() {
  const payload = await getPayload({ config })

  if (process.env.SEED_RESET === 'true') {
    await clearCatalog(payload)
  }

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
  const categoryMap = new Map<string, number>()

  if (fs.existsSync(treePath)) {
    const lines = fs.readFileSync(treePath, 'utf-8').split('\n')
    let parentL1: number | null = null
    let parentL2: number | null = null

    for (const raw of lines) {
      const line = raw.trim()
      if (!line) continue
      const indent = raw.match(/^\s*/)?.[0].length ?? 0

      if (indent === 0) {
        const slug = slugify(line)
        const existing = await payload.find({
          collection: 'categories',
          where: { slug: { equals: slug } },
          limit: 1,
        })
        if (existing.docs[0]) {
          parentL1 = existing.docs[0].id as number
        } else {
          const doc = await payload.create({
            collection: 'categories',
            locale: 'en',
            data: { title: line, slug, level: '1' },
          })
          parentL1 = doc.id as number
        }
        categoryMap.set(line, parentL1)
        parentL2 = null
      } else if (indent <= 2 && parentL1) {
        const slug = slugify(line)
        const existing = await payload.find({
          collection: 'categories',
          where: { slug: { equals: slug } },
          limit: 1,
        })
        let id: number
        if (existing.docs[0]) {
          id = existing.docs[0].id as number
        } else {
          const doc = await payload.create({
            collection: 'categories',
            locale: 'en',
            data: { title: line, slug, level: '2', parent: parentL1 },
          })
          id = doc.id as number
        }
        parentL2 = id
        categoryMap.set(line, parentL2)
      } else if (parentL2) {
        const slug = slugify(line)
        const existing = await payload.find({
          collection: 'categories',
          where: { slug: { equals: slug } },
          limit: 1,
        })
        let id: number
        if (existing.docs[0]) {
          id = existing.docs[0].id as number
        } else {
          const doc = await payload.create({
            collection: 'categories',
            locale: 'en',
            data: { title: line, slug, level: '3', parent: parentL2 },
          })
          id = doc.id as number
        }
        categoryMap.set(line, id)
      }
    }
  }

  const csvPath = path.join(materialsDir, '产品主数据.csv')
  const seedProducts = process.env.SEED_PRODUCTS === 'true'
  if (seedProducts && fs.existsSync(csvPath)) {
    const rows = fs.readFileSync(csvPath, 'utf-8').trim().split('\n').slice(1)
    for (const row of rows) {
      const cols = row.split(',')
      if (cols.length < 7) continue
      const [sku, title, partNumber, cat1, cat2, brands, specs] = cols
      const slug = slugify(sku)
      const catIds: number[] = []
      if (cat2 && categoryMap.has(cat2)) catIds.push(categoryMap.get(cat2)!)
      else if (cat1 && categoryMap.has(cat1)) catIds.push(categoryMap.get(cat1)!)

      const existing = await payload.find({
        collection: 'products',
        where: { sku: { equals: sku } },
        limit: 1,
      })

      const productData = {
        sku,
        title,
        slug,
        partNumber: partNumber || undefined,
        summary: `${title} — B2B wholesale from Fengcheng.`,
        description: `OEM/ODM and drawing-based customization available. ${title}. Contact us for fitment confirmation and lead time.`,
        specs: specs || undefined,
        vehicleBrands: brands,
        categories: catIds,
        featured: true,
      }

      let productId: number
      if (existing.docs.length > 0) {
        productId = existing.docs[0].id as number
        await payload.update({
          collection: 'products',
          id: productId,
          locale: 'en',
          data: productData,
          context: { skipTranslateHook: true },
        })
      } else {
        const product = await payload.create({
          collection: 'products',
          locale: 'en',
          data: productData,
          context: { skipTranslateHook: true },
        })
        productId = product.id as number
      }

      for (const locale of locales) {
        if (locale === 'en') continue
        const updates: Record<string, string> = {}
        for (const field of ['title', 'summary', 'description'] as const) {
          const source = productData[field]
          if (!source) continue
          updates[field] = await translateText(source, locale as AppLocale)
        }
        if (Object.keys(updates).length > 0) {
          await payload.update({
            collection: 'products',
            id: productId,
            locale,
            data: updates,
            context: { skipTranslateHook: true },
          })
        }
      }
      console.log(`Product: ${sku}`)
    }
  } else if (!seedProducts) {
    console.log('Products skipped (set SEED_PRODUCTS=true to import from 产品主数据.csv).')
  }

  const faqPath = path.join(materialsDir, 'FAQ.txt')
  const faqItems = fs.existsSync(faqPath)
    ? parseFaqFile(fs.readFileSync(faqPath, 'utf-8'))
    : []

  for (const key of ['about', 'faq'] as const) {
    const data =
      key === 'faq'
        ? { key, title: 'FAQ', faqItems }
        : { key, title: 'About Us', body: company.aboutEn }

    const found = await payload.find({
      collection: 'site-content',
      where: { key: { equals: key } },
      limit: 1,
    })

    let docId: number
    if (found.docs[0]) {
      docId = found.docs[0].id as number
      await payload.update({
        collection: 'site-content',
        id: docId,
        locale: 'en',
        data,
      })
    } else {
      const doc = await payload.create({
        collection: 'site-content',
        locale: 'en',
        data,
      })
      docId = doc.id as number
    }

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
        id: docId,
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
