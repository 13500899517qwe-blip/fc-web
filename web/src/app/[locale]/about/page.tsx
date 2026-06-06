import Image from 'next/image'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getPayload } from '@/lib/payload'
import type { AppLocale } from '@/i18n/routing'
import { company } from '@/lib/company'
import { alibabaStore, alibabaCompany } from '@/lib/alibaba-store-data'
import { CheckCircle, Factory, Users, MapPin, Wrench, Star, Truck } from 'lucide-react'

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
    { icon: Star, label: ts('storeRating'), value: alibabaStore.metrics.storeRating },
    { icon: Truck, label: ts('onTimeDelivery'), value: alibabaStore.metrics.onTimeDelivery },
    { icon: Factory, label: t('floorspace'), value: company.floorspace },
    { icon: Wrench, label: t('machines'), value: `${company.productionMachines} units` },
    { icon: Users, label: ts('employees'), value: company.employees },
    { icon: MapPin, label: ts('founded'), value: alibabaStore.companyFacts.founded },
  ]

  return (
    <div className="bg-surface-muted">
      {/* Page header */}
      <div className="border-b border-border-light bg-surface py-10">
        <div className="container-main">
          <h1 className="text-2xl font-bold text-text-primary md:text-3xl">{ts('companyProfile')}</h1>
          <p className="mt-1 text-sm text-text-secondary">{company.legalName}</p>
        </div>
      </div>

      <div className="container-main py-10">
        {/* Main intro */}
        <div className="grid gap-8 rounded-xl border border-border-light bg-surface p-6 shadow-card md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border-light">
            <Image src={alibabaStore.companyVideoPoster} alt="" fill className="object-cover" unoptimized />
          </div>
          <div>
            <h2 className="text-lg font-bold text-text-primary">{ts('companyIntroduction')}</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-text-secondary">{alibabaStore.companyIntro}</p>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-text-secondary">{body}</p>
          </div>
        </div>

        {/* Stats grid */}
        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 rounded-xl border border-border-light bg-surface p-5 shadow-card">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <dt className="text-xs text-text-tertiary">{label}</dt>
                <dd className="mt-0.5 text-lg font-bold text-text-primary">{value}</dd>
              </div>
            </div>
          ))}
        </dl>

        {/* Certifications */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Certifications</h3>
          <div className="flex flex-wrap gap-3">
            {company.certifications.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-1.5 rounded-full border border-border-light bg-surface-subtle px-4 py-2 text-xs font-semibold text-text-secondary"
              >
                <CheckCircle className="h-3.5 w-3.5 text-success" />
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Factory images */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {alibabaStore.profileImages.map((src, i) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border-light">
              <Image src={src} alt={`Factory ${i + 1}`} fill className="object-cover transition duration-300 hover:scale-105" unoptimized />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
