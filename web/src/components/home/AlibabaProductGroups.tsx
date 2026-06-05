import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { buildProductsHref } from '@/lib/catalog-url'
import { alibabaStore } from '@/lib/alibaba-store-data'

export async function AlibabaProductGroups() {
  const t = await getTranslations('store')

  return (
    <section className="border-t border-zinc-200 bg-[#fafafa] py-8">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-lg font-bold text-zinc-900">{t('productCategory')}</h2>
          <Link href="/products" className="text-sm font-semibold text-[#ff6a00] hover:underline">
            {t('seeAllCategories')} →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {alibabaStore.productGroups.map(({ label, brand }) => (
            <Link
              key={brand}
              href={buildProductsHref({ brand })}
              className="rounded border border-zinc-200 bg-white px-3 py-4 text-center text-sm font-medium text-zinc-800 transition hover:border-[#ff6a00] hover:text-[#ff6a00]"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
