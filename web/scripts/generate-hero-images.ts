/**
 * Generate hero/banner SVG images for the site.
 * Run: npx tsx scripts/generate-hero-images.ts
 */
import fs from 'fs'
import path from 'path'

const OUT_DIR = path.resolve(__dirname, '../public/images')
fs.mkdirSync(OUT_DIR, { recursive: true })

const images: Record<string, string> = {
  'hero-factory': `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="800" viewBox="0 0 1920 800">
  <defs>
    <linearGradient id="hbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="50%" style="stop-color:#1e293b"/>
      <stop offset="100%" style="stop-color:#0f172a"/>
    </linearGradient>
    <linearGradient id="ov" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:0.85"/>
      <stop offset="60%" style="stop-color:#0f172a;stop-opacity:0.4"/>
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:0.2"/>
    </linearGradient>
  </defs>
  <rect fill="url(#hbg)" width="1920" height="800"/>
  <!-- Factory silhouette -->
  <g fill="#1e293b" opacity="0.6">
    <rect x="100" y="350" width="180" height="300"/>
    <rect x="290" y="280" width="220" height="370"/>
    <rect x="520" y="200" width="200" height="450"/>
    <rect x="730" y="320" width="160" height="330"/>
    <rect x="900" y="250" width="240" height="400"/>
    <rect x="1150" y="300" width="180" height="350"/>
    <rect x="1340" y="350" width="200" height="300"/>
    <rect x="1550" y="270" width="180" height="380"/>
  </g>
  <!-- Windows -->
  <g fill="#3b82f6" opacity="0.15">
    <rect x="130" y="380" width="40" height="40" rx="2"/>
    <rect x="190" y="380" width="40" height="40" rx="2"/>
    <rect x="320" y="310" width="40" height="40" rx="2"/>
    <rect x="390" y="310" width="40" height="40" rx="2"/>
    <rect x="550" y="230" width="50" height="40" rx="2"/>
    <rect x="630" y="230" width="50" height="40" rx="2"/>
    <rect x="930" y="280" width="50" height="40" rx="2"/>
    <rect x="1020" y="280" width="50" height="40" rx="2"/>
    <rect x="1580" y="300" width="40" height="40" rx="2"/>
    <rect x="1650" y="300" width="40" height="40" rx="2"/>
  </g>
  <!-- Car silhouette -->
  <g fill="#334155" opacity="0.4">
    <rect x="200" y="570" width="120" height="40" rx="8"/>
    <rect x="350" y="500" width="140" height="50" rx="8"/>
    <rect x="600" y="530" width="130" height="45" rx="8"/>
    <rect x="850" y="490" width="150" height="50" rx="8"/>
    <rect x="1150" y="550" width="120" height="45" rx="8"/>
  </g>
  <!-- Ground line -->
  <line x1="0" y1="650" x2="1920" y2="650" stroke="#d4541e" stroke-width="2" opacity="0.3"/>
  <!-- Logo text -->
  <text x="960" y="580" text-anchor="middle" fill="#d4541e" font-family="system-ui,sans-serif" font-size="14" font-weight="700" letter-spacing="6" opacity="0.5">FENGCHENG AUTO PARTS</text>
</svg>`,

  'hero-products': `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="600" viewBox="0 0 1920 600">
  <defs>
    <linearGradient id="pbg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect fill="url(#pbg)" width="1920" height="600"/>
  <!-- Grid pattern -->
  <g stroke="#ffffff" stroke-opacity="0.03" stroke-width="1">
    <line x1="0" y1="100" x2="1920" y2="100"/>
    <line x1="0" y1="200" x2="1920" y2="200"/>
    <line x1="0" y1="300" x2="1920" y2="300"/>
    <line x1="0" y1="400" x2="1920" y2="400"/>
    <line x1="0" y1="500" x2="1920" y2="500"/>
    <line x1="240" y1="0" x2="240" y2="600"/>
    <line x1="480" y1="0" x2="480" y2="600"/>
    <line x1="720" y1="0" x2="720" y2="600"/>
    <line x1="960" y1="0" x2="960" y2="600"/>
    <line x1="1200" y1="0" x2="1200" y2="600"/>
    <line x1="1440" y1="0" x2="1440" y2="600"/>
    <line x1="1680" y1="0" x2="1680" y2="600"/>
  </g>
  <!-- Accent line -->
  <line x1="0" y1="540" x2="1920" y2="540" stroke="#d4541e" stroke-width="3" opacity="0.2"/>
</svg>`,

  'category-body-parts': `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect fill="#0f172a" width="400" height="300" rx="12"/>
  <g fill="none" stroke="#d4541e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.6" transform="translate(140,70)">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" transform="scale(2)"/>
  </g>
  <text x="200" y="210" text-anchor="middle" fill="#d4541e" font-family="system-ui,sans-serif" font-size="14" font-weight="700" letter-spacing="2" opacity="0.8">BODY PARTS</text>
  <text x="200" y="240" text-anchor="middle" fill="#64748b" font-family="system-ui,sans-serif" font-size="11" opacity="0.6">Bumpers · Hoods · Fenders · Doors</text>
</svg>`,

  'category-lights': `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect fill="#0f172a" width="400" height="300" rx="12"/>
  <g fill="none" stroke="#3b82f6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.6" transform="translate(130,70)">
    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" transform="scale(1.5)"/>
  </g>
  <text x="200" y="210" text-anchor="middle" fill="#3b82f6" font-family="system-ui,sans-serif" font-size="14" font-weight="700" letter-spacing="2" opacity="0.8">LIGHTS &amp; LIGHTING</text>
  <text x="200" y="240" text-anchor="middle" fill="#64748b" font-family="system-ui,sans-serif" font-size="11" opacity="0.6">Headlights · Tail Lights · LEDs</text>
</svg>`,
}

let count = 0
for (const [name, svg] of Object.entries(images)) {
  fs.writeFileSync(path.join(OUT_DIR, `${name}.svg`), svg, 'utf-8')
  count++
  console.log(`  Created: ${name}.svg`)
}
console.log(`✅ Generated ${count} hero/banner images in ${OUT_DIR}`)
