import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function main() {
  const payload = await getPayload({ config })
  const r = await payload.find({
    collection: 'products',
    where: { sku: { equals: 'ALI-1601599388596' } },
    depth: 2,
    limit: 1,
  })
  const d = r.docs[0]
  if (!d) {
    console.log('Product not found')
    process.exit(1)
  }
  console.log(
    JSON.stringify(
      {
        sku: d.sku,
        sourceImageUrl: (d as { sourceImageUrl?: string }).sourceImageUrl,
        image: d.image,
      },
      null,
      2,
    ),
  )

  const all = await payload.find({ collection: 'products', limit: 200, depth: 0 })
  const withImage = all.docs.filter((p) => p.image).length
  const withSource = all.docs.filter((p) => (p as { sourceImageUrl?: string }).sourceImageUrl).length
  console.log(`\nTotal: ${all.totalDocs}, with media image: ${withImage}, with sourceImageUrl: ${withSource}`)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
