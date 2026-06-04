/**
 * Phase 1 acceptance helper — run while dev server is up:
 *   pnpm dev
 *   pnpm exec tsx scripts/verify-locales.ts
 */
const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const locales = ['en', 'fr', 'de', 'es', 'ru', 'ja', 'ar', 'pt']
const paths = ['', '/products', '/about', '/faq', '/contact', '/inquiry']

async function main() {
  let failed = 0
  for (const locale of locales) {
    for (const p of paths) {
      const url = `${base}/${locale}${p}`
      const res = await fetch(url)
      const ok = res.status === 200
      console.log(`${ok ? 'OK' : 'FAIL'} ${res.status} ${url}`)
      if (!ok) failed++
    }
  }
  process.exit(failed > 0 ? 1 : 0)
}

main()
