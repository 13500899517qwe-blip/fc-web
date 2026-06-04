import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { locales } from '../src/i18n/routing'
import { translateText } from '../src/lib/translate'
import { company } from '../src/lib/company'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function seed() {
  const payload = await getPayload({ config })

  // 清空数据（按依赖顺序）
  for (const coll of ['products', 'categories', 'inquiries', 'site-content'] as const) {
    const all = await payload.find({ collection: coll, limit: 500, depth: 0, pagination: false })
    for (const doc of all.docs) {
      await payload.delete({ collection: coll, id: doc.id })
    }
    console.log(`Cleared ${coll}: ${all.docs.length} deleted`)
  }
  // Users 保留 admin
  const users = await payload.find({ collection: 'users', limit: 100, depth: 0, pagination: false })
  for (const u of users.docs) {
    if (u.email !== 'admin@example.com') {
      await payload.delete({ collection: 'users', id: u.id })
    }
  }

  // 创建管理员
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com'
  const password = process.env.SEED_ADMIN_PASSWORD || 'changeme123'
  const existing = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })
  if (existing.docs.length === 0) {
    await payload.create({ collection: 'users', data: { email, password } })
  }
  console.log(`Admin: ${email} / ${password}`)

  // 读 CSV
  const csvPath = path.resolve(__dirname, '../../网站资料/产品主数据.csv')
  const rows = fs.readFileSync(csvPath, 'utf-8').trim().split('\n').slice(1)

  const catCache = new Map<string, number>()

  for (const row of rows) {
    const cols = row.split(',')
    if (cols.length < 8) continue
    const [sku, title, partNumber, cat1, cat2, brands, specs] = cols.map(s => s.trim())

    // 一级
    if (!catCache.has(cat1)) {
      const slug = slugify(cat1)
      const doc = await payload.create({ collection: 'categories', locale: 'en', data: { title: cat1, slug, level: '1' } })
      catCache.set(cat1, doc.id as number)
      console.log(`  L1: ${cat1}`)
    }

    // 二级
    const catIds: number[] = [catCache.get(cat1)!]
    if (cat2) {
      if (!catCache.has(cat2)) {
        const slug = slugify(cat2)
        const doc = await payload.create({ collection: 'categories', locale: 'en', data: { title: cat2, slug, level: '2', parent: catCache.get(cat1)! } })
        catCache.set(cat2, doc.id as number)
        console.log(`  L2: ${cat2}`)
      }
      catIds.push(catCache.get(cat2)!)
    }

    // 产品
    const slug = sku.toLowerCase()
    const p = await payload.create({
      collection: 'products', locale: 'en',
      data: {
        sku, title, slug,
        partNumber: partNumber || undefined,
        summary: `${title} for B2B wholesale. Contact us for OEM/ODM orders.`,
        description: `High-quality ${title}. Ideal for automotive lighting upgrades. Supports custom branding and packaging.`,
        specs, vehicleBrands: brands,
        categories: catIds,
        featured: true,
      },
      context: { skipTranslateHook: true },
    })
    console.log(`  Product: ${sku}`)

    // 翻译
    for (const locale of locales) {
      if (locale === 'en') continue
      const updates: Record<string, string> = {}
      for (const field of ['title', 'summary', 'description'] as const) {
        const source = p[field] as string
        if (source) updates[field] = await translateText(source, locale)
      }
      await payload.update({ collection: 'products', id: p.id, locale, data: updates, context: { skipTranslateHook: true } })
    }
  }

  // Site content
  const aboutBody = company.aboutEn
  for (const key of ['about', 'faq'] as const) {
    const data = key === 'faq'
      ? { key, title: 'FAQ', faqItems: [
          { question: 'What is your MOQ?', answer: 'Standard MOQ is 50 sets per SKU.' },
          { question: 'Do you provide samples?', answer: 'Yes, samples ship in 3-5 business days.' },
          { question: 'OEM/ODM available?', answer: 'Yes, we support custom branding and packaging.' },
        ]}
      : { key, title: 'About Us', body: aboutBody }
    const doc = await payload.create({ collection: 'site-content', locale: 'en', data })
    for (const locale of locales) {
      if (locale === 'en') continue
      const translated: Record<string, unknown> = {}
      if (data.title) translated.title = await translateText(data.title, locale)
      if ('body' in data && data.body) translated.body = await translateText(data.body, locale)
      if ('faqItems' in data && data.faqItems) {
        translated.faqItems = await Promise.all(data.faqItems.map(async (item: any) => ({
          question: await translateText(item.question, locale),
          answer: await translateText(item.answer, locale),
        })))
      }
      await payload.update({ collection: 'site-content', id: doc.id, locale, data: translated })
    }
    console.log(`  Content: ${key}`)
  }

  console.log('Seed complete!')
  process.exit(0)
}

seed().catch(e => { console.error(e); process.exit(1) })
