import { Link } from '@/i18n/navigation'
import { ChevronRight } from 'lucide-react'

type Crumb = { label: string; href?: string }

type Props = { items: Crumb[] }

export function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-text-tertiary">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-brand">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-text-primary">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
