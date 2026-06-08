/**
 * Generate SVG placeholder images for ALL products from Alibaba data.
 * Run: npx tsx scripts/generate-product-placeholders.ts
 */
import fs from 'fs'
import path from 'path'

const DATA_PATH = path.resolve(__dirname, '../public/data/alibaba-products-master.json')
const OUT_DIR = path.resolve(__dirname, '../public/product-placeholders')

const CATEGORY_COLORS: Record<string, string> = {
  'BUMPER & COVER': '#b03e12',
  'FENDER & DOOR': '#6b3fa0',
  'HOOD & BONNET': '#3a6b8a',
  'TAILGATE & PANEL': '#5a4a3a',
  'SIDE PANEL': '#2d5a27',
  'ROOF & PANEL': '#1a6fb5',
  'MUDGUARD & FLAP': '#6b6964',
  'BRACKET & SUPPORT': '#4a6a7a',
  'LIGHTS & LIGHTING': '#1a6fb5',
  'BODY PARTS': '#d4541e',
}

const ICONS: Record<string, string> = {
  'BUMPER & COVER': 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7a2 2 0 012-2h14a2 2 0 012 2M3 7h18',
  'FENDER & DOOR': 'M14 3v4a1 1 0 001 1h4M6 21h12a2 2 0 002-2V7l-5-5H6a2 2 0 00-2 2v16a2 2 0 002 2z',
  'HOOD & BONNET': 'M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z',
  'TAILGATE & PANEL': 'M12 3v18M3 12h18',
  'SIDE PANEL': 'M3 3h18v18H3V3z',
  'ROOF & PANEL': 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z',
  'MUDGUARD & FLAP': 'M12 2l-8 4v12l8 4 8-4V6l-8-4z',
  'BRACKET & SUPPORT': 'M7 21h10M12 3v18M3 7l2 2 4-4M15 5l4 4 2-2',
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').substring(0, 80)
}

function generateSvg(sku: string, title: string, category: string): string {
  const color = CATEGORY_COLORS[category] || '#6b6964'
  const iconPath = ICONS[category] || ICONS['BUMPER & COVER']
  const catLine = category || 'AUTO PARTS'
  const shortTitle = title.length > 56 ? title.slice(0, 53) + '...' : title
  const shortSku = sku.length > 20 ? sku.slice(0, 17) + '...' : sku

  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f8fafc"/>
      <stop offset="100%" style="stop-color:#e2e8f0"/>
    </linearGradient>
  </defs>
  <rect fill="url(#bg)" width="800" height="800" rx="8"/>
  <g transform="translate(375,230)" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.35">
    <path d="${iconPath}" transform="scale(1.5)"/>
  </g>
  <text x="400" y="390" text-anchor="middle" fill="${color}" font-family="system-ui,sans-serif" font-size="13" font-weight="700" letter-spacing="2" opacity="0.7">${catLine.toUpperCase()}</text>
  <text x="400" y="420" text-anchor="middle" fill="#475569" font-family="system-ui,sans-serif" font-size="12" opacity="0.5">${shortSku}</text>
  <text x="400" y="500" text-anchor="middle" fill="#0f172a" font-family="system-ui,sans-serif" font-size="15" font-weight="600">
    <tspan x="400" dy="0">${shortTitle}</tspan>
  </text>
  <rect x="250" y="580" width="300" height="36" rx="18" fill="${color}" opacity="0.08"/>
  <text x="400" y="603" text-anchor="middle" fill="${color}" font-family="system-ui,sans-serif" font-size="12" font-weight="600" opacity="0.7">Request real photos →</text>
</svg>`
}

function main() {
  if (!fs.existsSync(DATA_PATH)) {
    console.error(`Data file not found: ${DATA_PATH}`)
    process.exit(1)
  }

  const rawData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'))
  const products: any[] = rawData.products || []

  fs.mkdirSync(OUT_DIR, { recursive: true })

  let count = 0
  for (const p of products) {
    const sku = `ALI-${p.aliId}`
    const title = p.title || sku
    const category = p.category || 'BODY PARTS'
    const svg = generateSvg(sku, title, category)
    const filename = `${slugify(sku)}.svg`
    fs.writeFileSync(path.join(OUT_DIR, filename), svg, 'utf-8')
    count++
  }

  console.log(`✅ Generated ${count} SVG placeholders in ${OUT_DIR}`)
}

main()
