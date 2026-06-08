/**
 * Generate SVG placeholder images for products.
 * Creates branded, category-aware placeholders that look professional
 * until real product photos are available.
 */

const CATEGORY_COLORS: Record<string, string> = {
  'BODY PARTS': '#d4541e',
  'LIGHTS & LIGHTING': '#1a6fb5',
  'GRILLES': '#2d5a27',
  'FENDERS': '#6b3fa0',
  'BUMPERS': '#b03e12',
  'HOODS': '#3a6b8a',
  'DOORS': '#5a4a3a',
}

const ICONS: Record<string, string> = {
  'BODY PARTS': 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  'LIGHTS & LIGHTING': 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  'BUMPERS': 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7a2 2 0 012-2h14a2 2 0 012 2M3 7h18',
  'GRILLES': 'M4 5h16M4 12h16M4 19h16M8 5v14M16 5v14',
  'FENDERS': 'M14 3v4a1 1 0 001 1h4M6 21h12a2 2 0 002-2V7l-5-5H6a2 2 0 00-2 2v16a2 2 0 002 2z',
  'HOODS': 'M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z',
  'DOORS': 'M12 3v18M3 12h18',
}

export function generateProductSvg(sku: string, title: string, category: string): string {
  const color = CATEGORY_COLORS[category] || '#6b6964'
  const iconPath = ICONS[category] || ICONS['BODY PARTS']
  const catLine = category || 'AUTO PARTS'
  const shortTitle = title.length > 60 ? title.slice(0, 57) + '...' : title
  const shortSku = sku.length > 20 ? sku.slice(0, 17) + '...' : sku

  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f8fafc"/>
      <stop offset="100%" style="stop-color:#e2e8f0"/>
    </linearGradient>
  </defs>
  <rect fill="url(#bg)" width="800" height="800" rx="8"/>
  <g transform="translate(400,260)" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.5">
    <path d="${iconPath}"/>
  </g>
  <text x="400" y="420" text-anchor="middle" fill="${color}" font-family="system-ui,sans-serif" font-size="14" font-weight="600" letter-spacing="2" opacity="0.7">${catLine.toUpperCase()}</text>
  <text x="400" y="460" text-anchor="middle" fill="#475569" font-family="system-ui,sans-serif" font-size="13" opacity="0.6">${shortSku}</text>
  <text x="400" y="520" text-anchor="middle" fill="#0f172a" font-family="system-ui,sans-serif" font-size="16" font-weight="600">
    <tspan x="400" dy="0">${shortTitle}</tspan>
  </text>
  <text x="400" y="600" text-anchor="middle" fill="#64748b" font-family="system-ui,sans-serif" font-size="12" opacity="0.5">Product image coming soon</text>
  <rect x="250" y="640" width="300" height="36" rx="18" fill="${color}" opacity="0.1"/>
  <text x="400" y="663" text-anchor="middle" fill="${color}" font-family="system-ui,sans-serif" font-size="12" font-weight="600">Request product photos →</text>
</svg>`
}
