import { parseSpecs } from '@/lib/parse-specs'

type Props = {
  specs?: string | null
  partNumber?: string
  vehicleBrands?: string
  sku: string
  labels: {
    specs: string
    partNumber: string
    brands: string
    sku: string
  }
}

export function ProductSpecsTable({ specs, partNumber, vehicleBrands, sku, labels }: Props) {
  const rows = parseSpecs(specs)

  const entries = [
    { label: labels.sku, value: sku },
    partNumber ? { label: labels.partNumber, value: partNumber } : null,
    vehicleBrands ? { label: labels.brands, value: vehicleBrands } : null,
    ...rows,
  ].filter(Boolean) as { label: string; value: string }[]

  if (entries.length === 0) return null

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200">
      <p className="border-b border-zinc-100 bg-zinc-50 px-4 py-2.5 text-sm font-semibold text-zinc-800">
        {labels.specs}
      </p>
      <dl className="divide-y divide-zinc-100">
        {entries.map(({ label, value }) => (
          <div key={`${label}-${value}`} className="grid grid-cols-[minmax(7rem,35%)_1fr] gap-3 px-4 py-2.5 text-sm">
            <dt className="font-medium text-zinc-500">{label}</dt>
            <dd className="text-zinc-800">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
