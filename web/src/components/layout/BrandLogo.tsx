import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { company } from '@/lib/company'

type Props = {
  /** nav = Weibo-style large bar logo; compact = header strip */
  variant?: 'nav' | 'compact' | 'footer'
  className?: string
}

const sizes = {
  nav: { icon: 'h-[60px] w-[60px]', wordmark: 'h-12 w-auto', gap: 'gap-3.5' },
  compact: { icon: 'h-11 w-11', wordmark: 'h-9 w-auto', gap: 'gap-2.5' },
  footer: { icon: 'h-10 w-10', wordmark: 'h-8 w-auto', gap: 'gap-2' },
} as const

export function BrandLogo({ variant = 'nav', className }: Props) {
  const s = sizes[variant]

  return (
    <Link href="/" className={cn('group flex shrink-0 items-center', s.gap, className)}>
      <Image
        src="/logo-icon.png"
        alt=""
        width={120}
        height={120}
        className={cn(s.icon, 'object-contain transition group-hover:opacity-90')}
        priority={variant === 'nav'}
      />
      <Image
        src="/logo-wordmark.png"
        alt={company.brandName}
        width={280}
        height={100}
        className={cn(s.wordmark, 'object-contain object-left', variant === 'compact' && 'hidden min-[480px]:block')}
        priority={variant === 'nav'}
      />
    </Link>
  )
}
