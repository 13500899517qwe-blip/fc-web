import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPayload } from '@/lib/payload'
import type { AppLocale } from '@/i18n/routing'
import { AddToInquiryButton } from '@/components/inquiry/AddToInquiryButton'

type Props = { params: Promise<{ locale: string }> }

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('products')

  let products: {
    id: string
    sku: string
    title: string
    slug: string
    summary?: string
    specs?: string
  }[] = []

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'products',
      locale: locale as AppLocale,
      limit: 100,
      depth: 0,
    })
    products = result.docs.map((doc) => ({
      id: String(doc.id),
      sku: doc.sku as string,
      title: doc.title as string,
      slug: doc.slug as string,
      summary: doc.summary as string | undefined,
      specs: doc.specs as string | undefined,
    }))
  } catch {
    /* empty */
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <p className="mt-2 text-sm text-zinc-500">{t('noPrice')}</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <article key={p.id} className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <Link href={`/products/${p.slug}`} className="text-lg font-semibold hover:text-blue-700">
              {p.title}
            </Link>
            <p className="mt-1 font-mono text-xs text-zinc-500">{p.sku}</p>
            {p.summary && <p className="mt-2 flex-1 text-sm text-zinc-600">{p.summary}</p>}
            <div className="mt-4">
              <AddToInquiryButton sku={p.sku} title={p.title} />
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
