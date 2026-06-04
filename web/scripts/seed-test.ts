import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function main() {
  const payload = await getPayload({ config })
  
  // 先清理
  const existing = await payload.find({ collection: 'categories', limit: 100, depth: 0, pagination: false })
  for (const d of existing.docs) { await payload.delete({ collection: 'categories', id: d.id }) }
  
  // 创建 L1
  const l1 = await payload.create({ collection: 'categories', locale: 'en', data: { title: 'Test L1', slug: 'test-l1', level: '1' } })
  console.log('L1 id:', l1.id, typeof l1.id)
  
  try {
    // 试字符串 ID
    const l2 = await payload.create({ collection: 'categories', locale: 'en', data: { title: 'Test L2', slug: 'test-l2', level: '2', parent: String(l1.id) } })
    console.log('L2 with string id OK:', l2.id)
  } catch(e: any) {
    console.log('String id FAILED:', e.message.slice(0, 100))
  }

  try {
    // 试数字 ID
    const l2b = await payload.create({ collection: 'categories', locale: 'en', data: { title: 'Test L2b', slug: 'test-l2b', level: '2', parent: l1.id } })
    console.log('L2 with number id OK:', l2b.id)
  } catch(e: any) {
    console.log('Number id FAILED:', e.message.slice(0, 100))
  }

  try {
    // 试对象
    const l2c = await payload.create({ collection: 'categories', locale: 'en', data: { title: 'Test L2c', slug: 'test-l2c', level: '2', parent: { id: l1.id } } })
    console.log('L2 with object id OK:', l2c.id)
  } catch(e: any) {
    console.log('Object id FAILED:', e.message.slice(0, 100))
  }

  process.exit(0)
}
main().catch(e => { console.error(e.message); process.exit(1) })
