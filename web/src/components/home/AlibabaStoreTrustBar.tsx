import { getTranslations } from 'next-intl/server'
import { alibabaStore } from '@/lib/alibaba-store-data'

/** Store metrics, services & highlights — moved off the global header */
export async function AlibabaStoreTrustBar() {
  const t = await getTranslations('store')

  const metrics = [
    { label: t('storeRating'), value: alibabaStore.metrics.storeRating },
    { label: t('onTimeDelivery'), value: alibabaStore.metrics.onTimeDelivery },
    { label: t('responseTime'), value: alibabaStore.metrics.responseTime },
    { label: t('floorspace'), value: alibabaStore.metrics.floorspace },
    { label: t('onlineRevenue'), value: alibabaStore.metrics.onlineRevenue },
  ]

  return (
    <section className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {metrics.map(({ label, value }) => (
            <div key={label} className="text-center lg:text-left">
              <p className="text-xs text-zinc-500">{label}</p>
              <p className="mt-0.5 text-sm font-bold text-zinc-900">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-zinc-100 pt-5">
          {alibabaStore.services.map((s) => (
            <span key={s} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700">
              {s}
            </span>
          ))}
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-zinc-600">
          {alibabaStore.highlights.map((h) => (
            <li key={h} className="flex items-center gap-1">
              <span className="text-green-600">✓</span>
              {h}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
