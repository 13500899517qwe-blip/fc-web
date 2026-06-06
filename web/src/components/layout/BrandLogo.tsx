import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { company } from '@/lib/company'

type Props = {
  variant?: 'nav' | 'compact' | 'footer'
  className?: string
}

const sizes = {
  nav: { width: 180, height: 45, iconSize: 'h-10 w-10' },
  compact: { width: 150, height: 38, iconSize: 'h-9 w-9' },
  footer: { width: 160, height: 40, iconSize: 'h-9 w-9' },
} as const

export function BrandLogo({ variant = 'nav', className }: Props) {
  const s = sizes[variant]

  // Use SVG logo for nav/footer, keep PNG icon as fallback
  return (
    <Link href="/" className={cn('group flex shrink-0 items-center gap-3', className)}>
      <Image
        src="/logo-icon.svg"
        alt=""
        width={48}
        height={48}
        className={cn(s.iconSize, 'object-contain')}
        priority={variant === 'nav'}
      />
      <Image
        src="/logo.svg"
        alt={company.brandName}
        width={s.width}
        height={s.height}
        className="object-contain object-left"
        priority={variant === 'nav'}
      />
    </Link>
  )
}
