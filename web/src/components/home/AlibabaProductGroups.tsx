import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { buildProductsHref } from '@/lib/catalog-url'
import { alibabaStore } from '@/lib/alibaba-store-data'
import { Car } from 'lucide-react'

export async function AlibabaProductGroups() {
  const t = await getTranslations('store')

  return (
    <section className="bg-white py-16">
      <div className="container-main">
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            {t('productCategory')}
          </span>
          <h2 className="mt-3 text-2xl font-bold text-text-primary md:text-3xl">
            Shop by <span className="text-brand">Vehicle Brand</span>
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Quality auto body parts for 98% of vehicle models worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {alibabaStore.productGroups.map(({ label, brand }) => (
            <Link
              key={brand}
              href={buildProductsHref({ brand })}
              className="group flex flex-col items-center gap-2 rounded-xl border border-border-light bg-surface-subtle px-3 py-5 text-center transition-all hover:border-brand/30 hover:bg-brand/5 hover:shadow-card-hover"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <Car className="h-5 w-5" />
              </div>
              <span className="text-sm font-semibold text-text-primary transition-colors group-hover:text-brand">
                {label.replace('For ', '')}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
          >
            {t('seeAllCategories')} &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
