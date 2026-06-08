export default function ProductDetailLoading() {
  return (
    <div className="bg-surface-muted">
      <div className="container-main py-8">
        {/* Breadcrumb skeleton */}
        <div className="mb-6 h-4 w-48 animate-pulse rounded bg-zinc-200" />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image skeleton */}
          <div className="animate-pulse">
            <div className="aspect-square rounded-xl bg-zinc-200" />
            <div className="mt-3 flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-16 w-16 rounded-lg bg-zinc-200" />
              ))}
            </div>
          </div>

          {/* Product info skeleton */}
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-24 rounded bg-zinc-200" />
            <div className="h-8 w-3/4 rounded bg-zinc-200" />
            <div className="h-4 w-1/2 rounded bg-zinc-200" />
            <div className="space-y-1">
              <div className="h-4 w-full rounded bg-zinc-200" />
              <div className="h-4 w-5/6 rounded bg-zinc-200" />
              <div className="h-4 w-2/3 rounded bg-zinc-200" />
            </div>
            <div className="h-12 w-full rounded-lg bg-zinc-200" />
            <div className="space-y-2">
              <div className="h-6 w-32 rounded bg-zinc-200" />
              <div className="h-24 w-full rounded-lg bg-zinc-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
