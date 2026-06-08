export default function ProductsLoading() {
  return (
    <div className="bg-surface-muted">
      {/* Header skeleton */}
      <div className="border-b border-border-light bg-surface py-10">
        <div className="container-main">
          <div className="h-4 w-24 animate-pulse rounded bg-zinc-200" />
          <div className="mt-3 h-8 w-48 animate-pulse rounded bg-zinc-200" />
        </div>
      </div>

      <div className="container-main py-8">
        <div className="flex gap-8">
          {/* Sidebar skeleton */}
          <aside className="hidden w-56 shrink-0 space-y-4 lg:block">
            <div className="h-72 animate-pulse rounded-xl bg-zinc-200" />
            <div className="h-48 animate-pulse rounded-xl bg-zinc-200" />
          </aside>

          {/* Product grid skeleton */}
          <div className="flex-1">
            <div className="mb-4 h-5 w-36 animate-pulse rounded bg-zinc-200" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse overflow-hidden rounded-xl border border-border-light bg-surface shadow-card">
                  <div className="aspect-square bg-zinc-200" />
                  <div className="space-y-2 p-4">
                    <div className="h-3 w-3/4 rounded bg-zinc-200" />
                    <div className="h-3 w-1/2 rounded bg-zinc-200" />
                    <div className="mt-3 h-9 w-full rounded-lg bg-zinc-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
