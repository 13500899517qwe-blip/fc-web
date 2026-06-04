import { Link } from '@/i18n/navigation'
import { ChevronRight } from 'lucide-react'

type Crumb = { label: string; href?: string }

type Props = { items: Crumb[] }

export function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-500">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-blue-700">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-zinc-800">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
