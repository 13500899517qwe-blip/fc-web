import { parseSpecs } from '@/lib/parse-specs'
import { Ruler, Hash, Building2, Package } from 'lucide-react'

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

const iconMap: Record<string, typeof Ruler> = {
  sku: Package,
  partNumber: Hash,
  brands: Building2,
  specs: Ruler,
}

export function ProductSpecsTable({ specs, partNumber, vehicleBrands, sku, labels }: Props) {
  const rows = parseSpecs(specs)

  const entries = [
    { key: 'sku', label: labels.sku, value: sku },
    partNumber ? { key: 'partNumber', label: labels.partNumber, value: partNumber } : null,
    vehicleBrands ? { key: 'brands', label: labels.brands, value: vehicleBrands } : null,
    ...rows.map((r) => ({ key: r.label, ...r })),
  ].filter(Boolean) as { key: string; label: string; value: string }[]

  if (entries.length === 0) return null

  return (
    <div className="overflow-hidden rounded-xl border border-border-light bg-surface shadow-card">
      <div className="flex items-center gap-2 border-b border-border-light bg-surface-subtle px-5 py-3">
        <Ruler className="h-4 w-4 text-brand" />
        <p className="text-sm font-bold text-text-primary">{labels.specs}</p>
      </div>
      <dl className="divide-y divide-border-light">
        {entries.map(({ key, label, value }) => {
          const Icon = iconMap[key] || Ruler
          return (
            <div
              key={`${key}-${value}`}
              className="grid grid-cols-[minmax(7rem,35%)_1fr] gap-3 px-5 py-3 text-sm transition-colors hover:bg-surface-subtle/50"
            >
              <dt className="flex items-center gap-2 font-medium text-text-tertiary">
                <Icon className="h-3.5 w-3.5" />
                {label}
              </dt>
              <dd className="text-text-primary">{value}</dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
