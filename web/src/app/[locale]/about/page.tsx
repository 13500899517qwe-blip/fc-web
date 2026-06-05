import Image from 'next/image'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getPayload } from '@/lib/payload'
import type { AppLocale } from '@/i18n/routing'
import { company } from '@/lib/company'
import { alibabaStore, alibabaCompany } from '@/lib/alibaba-store-data'

type Props = { params: Promise<{ locale: string }> }

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('about')
  const ts = await getTranslations('store')

  let body: string = alibabaCompany.aboutEn || company.aboutEn

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'site-content',
      locale: locale as AppLocale,
      where: { key: { equals: 'about' } },
      limit: 1,
    })
    if (result.docs[0]?.body) body = result.docs[0].body as string
  } catch {
    /* default */
  }

  const stats = [
    { label: ts('founded'), value: alibabaStore.companyFacts.founded },
    { label: ts('employees'), value: alibabaStore.companyFacts.employees },
    { label: t('floorspace'), value: company.floorspace },
    { label: t('machines'), value: String(company.productionMachines) },
    { label: t('rating'), value: company.storeRating },
    { label: t('delivery'), value: company.onTimeDelivery },
  ]

  return (
    <div className="bg-[#f5f5f5]">
      <div className="border-b border-zinc-200 bg-white py-8">
        <div className="mx-auto max-w-[1200px] px-4">
          <h1 className="text-xl font-bold text-zinc-900">{ts('companyProfile')}</h1>
          <p className="mt-1 text-sm text-zinc-600">{company.legalName}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 py-10">
        <div className="grid gap-8 rounded border border-zinc-200 bg-white p-6 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded border border-zinc-200">
            <Image src={alibabaStore.companyVideoPoster} alt="" fill className="object-cover" unoptimized />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-900">{ts('companyIntroduction')}</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-zinc-700">{alibabaStore.companyIntro}</p>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-zinc-600">{body}</p>
          </div>
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(({ label, value }) => (
            <div key={label} className="rounded border border-zinc-200 bg-white p-5 text-center">
              <dt className="text-xs text-zinc-500">{label}</dt>
              <dd className="mt-1 text-xl font-bold text-[#ff6a00]">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {alibabaStore.profileImages.map((src, i) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden rounded border border-zinc-200">
              <Image src={src} alt={`Factory ${i + 1}`} fill className="object-cover" unoptimized />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
