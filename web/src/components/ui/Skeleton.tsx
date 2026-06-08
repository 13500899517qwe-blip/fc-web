export function LoadingSkeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('animate-pulse space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded bg-zinc-200"
          style={{ width: `${Math.max(40, 100 - i * 20)}%` }}
        />
      ))}
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-border-light bg-surface shadow-card">
      <div className="aspect-square bg-zinc-200" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-3/4 rounded bg-zinc-200" />
        <div className="h-3 w-1/2 rounded bg-zinc-200" />
        <div className="h-8 w-full rounded-lg bg-zinc-200" />
      </div>
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-8">
      <div className="h-10 w-1/3 rounded bg-zinc-200" />
      <div className="h-4 w-2/3 rounded bg-zinc-200" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-xl bg-zinc-200" />
        ))}
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
