/**
 * Import products from 阿里爬取数据.json into Payload CMS.
 *
 * Usage: pnpm import-alibaba
 *
 * - Reads public/data/alibaba-products.json
 * - Creates products without images first (fast)
 * - Then downloads & uploads images to Vercel Blob
 * - Skips products whose SKU already exists
 */

import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const DATA_PATH = path.resolve(__dirname, '../public/data/alibaba-products.json')

// ── helpers ──

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 80)
}

function isBlobImageUrl(url: string | null | undefined): boolean {
  return !!url && url.includes('blob.vercel-storage.com')
}

async function downloadImage(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'FengchengImport/1.0' },
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) return null
    return Buffer.from(await res.arrayBuffer())
  } catch {
    return null
  }
}

// ── main ──

async function main() {
  // Check data file
  if (!fs.existsSync(DATA_PATH)) {
    console.error(`Data file not found: ${DATA_PATH}`)
    process.exit(1)
  }

  const rawData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'))
  const products: any[] = rawData.products || []
  console.log(`Found ${products.length} products in data file`)

  const payload = await getPayload({ config })

  // ── Build category map ──
  const { docs: categories } = await payload.find({ collection: 'categories', limit: 100 })
  const catByName = new Map<string, number>()
  for (const c of categories) {
    catByName.set(c.title as string, c.id as number)
  }
  console.log(`Categories: ${catByName.size} found in DB`)

  // ── Step 1: Create products (no images) ──
  console.log('\n── Creating products ──')
  let created = 0, skipped = 0, failed = 0, featuredSet = 0

  for (const [index, p] of products.entries()) {
    const sku = `ALI-${p.aliId}`
    try {
      const existing = await payload.find({
        collection: 'products',
        where: { sku: { equals: sku } },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        const doc = existing.docs[0]
        const patch: Record<string, unknown> = {}
        if (p.image && !doc.sourceImageUrl) patch.sourceImageUrl = p.image
        if (featuredSet < 8 && !doc.featured) {
          patch.featured = true
          featuredSet++
        }
        if (Object.keys(patch).length > 0) {
          await payload.update({
            collection: 'products',
            id: doc.id,
            locale: 'en',
            data: patch,
            context: { skipTranslateHook: true },
          })
        }
        skipped++
        continue
      }

      // Category ID
      const catIds: number[] = []
      if (p.category && catByName.has(p.category)) {
        catIds.push(catByName.get(p.category)!)
      } else {
        // Try partial match
        for (const [name, id] of catByName) {
          if (name.toLowerCase().includes(p.category?.toLowerCase() || '')) {
            catIds.push(id)
            break
          }
        }
      }

      const highlightsStr: string = p.highlights || ''
      const firstLine = highlightsStr.split('\n')[0]?.replace(/^[^:]*:\s*/, '') || ''

      const specParts = [p.material, p.size, p.warranty, p.condition].filter(Boolean)
      if (p.carMake) specParts.unshift(`Fit: ${p.carMake}`)

      await payload.create({
        collection: 'products',
        locale: 'en',
        data: {
          sku,
          title: p.title || sku,
          slug: slugify(p.title || sku),
          summary: firstLine,
          description: highlightsStr,
          specs: specParts.join('; ').substring(0, 500),
          vehicleBrands: p.vehicleBrands || '',
          categories: catIds,
          featured: index < 8,
          sourceImageUrl: p.image || undefined,
        },
        context: { skipTranslateHook: true },
      })

      created++
      if (created % 5 === 0) console.log(`  ${created}/${products.length} products created...`)
    } catch (e: any) {
      failed++
      console.error(`  FAIL ${sku}: ${e.message}`)
    }
  }
  console.log(`Products: ${created} created, ${skipped} skipped, ${failed} failed`)

  // ── Step 2: Upload images ──
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.log('\n⚠️  BLOB_READ_WRITE_TOKEN not set, skipping image upload')
    console.log('   Re-run with the token set to upload images')
  } else {
    console.log('\n── Uploading images ──')

    const { docs: allProducts } = await payload.find({
      collection: 'products',
      limit: 500,
    })

    let imgOk = 0, imgSkip = 0, imgFail = 0

    for (const p of products) {
      const sku = `ALI-${p.aliId}`
      const imageUrl: string | null = p.image || null
      if (!imageUrl) { imgSkip++; continue }

      try {
        const productDoc: any = (allProducts as any[]).find((d: any) => d.sku === sku)
        if (!productDoc) { imgSkip++; continue }

        const existingImageId =
          typeof productDoc.image === 'object' && productDoc.image !== null
            ? productDoc.image.id
            : productDoc.image

        if (existingImageId) {
          const existingMedia: any = await payload.findByID({
            collection: 'media',
            id: existingImageId,
            depth: 0,
          })
          if (isBlobImageUrl(existingMedia?.url)) {
            imgSkip++
            continue
          }
          await payload.delete({ collection: 'media', id: existingImageId }).catch(() => {})
        }

        const buffer = await downloadImage(imageUrl)
        if (!buffer) { imgFail++; continue }

        const media = await payload.create({
          collection: 'media',
          data: { alt: p.title || 'Product image' },
          file: {
            data: buffer,
            mimetype: 'image/jpeg',
            name: `${p.aliId}.jpg`,
            size: buffer.length,
          },
        })

        if (!isBlobImageUrl(media.url)) {
          console.error(`  IMG WARN ${sku}: media saved without Blob URL (${media.url})`)
        }

        await payload.update({
          collection: 'products',
          id: productDoc.id,
          locale: 'en',
          data: {
            image: media.id,
            sourceImageUrl: imageUrl,
          },
          context: { skipTranslateHook: true },
        })

        imgOk++
        if (imgOk % 5 === 0) console.log(`  ${imgOk} images uploaded...`)
      } catch (e: any) {
        imgFail++
        console.error(`  IMG FAIL ${sku}: ${e.message}`)
      }
    }

    console.log(`Images: ${imgOk} uploaded, ${imgSkip} skipped, ${imgFail} failed`)
  }

  console.log('\n✅ Import complete.')
  process.exit(0)
}

main().catch((err) => {
  console.error('Import failed:', err)
  process.exit(1)
})
