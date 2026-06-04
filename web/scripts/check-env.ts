const keys = ['DATABASE_URI', 'POSTGRES_URL', 'DATABASE_URL', 'PGHOST'] as const
for (const k of keys) {
  const v = process.env[k] || ''
  console.log(`${k}: length=${v.length}${v.includes('neon') ? ' (neon)' : v.includes('localhost') ? ' (localhost)' : ''}`)
}
