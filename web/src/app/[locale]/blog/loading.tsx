export default function BlogLoading() {
  return (
    <div className="bg-surface-muted">
      {/* Header skeleton */}
      <div className="border-b border-border-light bg-surface py-12">
        <div className="container-main">
          <div className="h-4 w-16 animate-pulse rounded bg-zinc-200" />
          <div className="mt-3 h-8 w-40 animate-pulse rounded bg-zinc-200" />
          <div className="mt-2 h-4 w-96 animate-pulse rounded bg-zinc-200" />
        </div>
      </div>

      {/* Blog grid skeleton */}
      <div className="container-main py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse overflow-hidden rounded-xl border border-border-light bg-surface shadow-card">
              <div className="aspect-[16/9] bg-zinc-200" />
              <div className="space-y-2 p-5">
                <div className="flex gap-1.5">
                  <div className="h-4 w-16 rounded-full bg-zinc-200" />
                  <div className="h-4 w-20 rounded-full bg-zinc-200" />
                </div>
                <div className="mt-3 h-5 w-full rounded bg-zinc-200" />
                <div className="h-5 w-3/4 rounded bg-zinc-200" />
                <div className="mt-2 space-y-1">
                  <div className="h-3 w-full rounded bg-zinc-200" />
                  <div className="h-3 w-5/6 rounded bg-zinc-200" />
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-3 w-20 rounded bg-zinc-200" />
                  <div className="h-3 w-16 rounded bg-zinc-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
