import Image from 'next/image'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getPayload } from '@/lib/payload'
import type { AppLocale } from '@/i18n/routing'
import { company } from '@/lib/company'
import { alibabaStore } from '@/lib/alibaba-store-data'
import {
  CheckCircle, Factory, Users, MapPin, Wrench, Star, Truck,
  ShieldCheck, FlaskConical, Ruler, Building2, Globe, Award
} from 'lucide-react'

const factoryImages = [
  "https://s.alicdn.com/@sc02/kf/H427e3a68113045bab6e01cd1ba618f59e.jpg",
  "https://s.alicdn.com/@sc02/kf/H8f7b609114214666be07c90bc8aa0b19A.jpg",
  "https://s.alicdn.com/@sc02/kf/H8ae0d36f5cfd47169f967e8a2f6c20a5i.jpg",
  "https://s.alicdn.com/@sc02/kf/H4f9d31d5a6714876bac49cecc8ba291dY.jpg",
  "https://s.alicdn.com/@sc02/kf/H7952badc38de4a4a9c017e8404e5dd573.jpg",
  "https://s.alicdn.com/@sc02/kf/H57c6899e174d4fc19802188784d9a754O.jpg",
  "https://s.alicdn.com/@sc02/kf/Hab68c11aeb35442f90f0a5c8ed826d4bp.jpg",
  "https://s.alicdn.com/@sc02/kf/H245dcbcc90344083b17e6106a3923fa8w.jpg"
]

type Props = { params: Promise<{ locale: string }> }

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('about')
  const ts = await getTranslations('store')

  let body: string = company.aboutEn

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
    { icon: Wrench, label: t('machines'), value: `${company.productionMachines}` },
    { icon: Users, label: ts('employees'), value: company.employees },
    { icon: MapPin, label: ts('founded'), value: '2025' },
    { icon: Globe, label: 'Main Markets', value: 'NA 40% · EU 30% · ME 20%' },
    { icon: Award, label: 'Annual Output', value: '180,000 units' },
  ]

  const capabilities = [
    { icon: Ruler, label: 'Minor customization' },
    { icon: Ruler, label: 'Drawing-based customization' },
    { icon: FlaskConical, label: 'Sample-based customization' },
    { icon: Building2, label: 'Full customization' },
  ]

  const qualityItems = [
    'Raw material identification and traceability',
    'Finished product inspection (3 QC inspectors)',
    'Testing instruments (9 units)',
    'Inspection of all products on all production lines',
  ]

  return (
    <div className="bg-surface-muted">
      {/* Page header */}
      <div className="border-b border-border-light bg-surface py-10">
        <div className="container-main">
          <h1 className="text-2xl font-bold text-text-primary md:text-3xl">{ts('companyProfile')}</h1>
          <p className="mt-1 text-sm text-text-secondary">{company.legalName}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
              <ShieldCheck className="h-3 w-3" />
              Custom Manufacturer
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
              <CheckCircle className="h-3 w-3" />
              SGS Verified
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-subtle px-3 py-1 text-xs font-semibold text-text-secondary">
              Fortune 500 Supplier
            </span>
          </div>
        </div>
      </div>

      <div className="container-main py-10">
        {/* Main intro with factory image */}
        <div className="grid gap-8 rounded-xl border border-border-light bg-surface p-6 shadow-card md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border-light">
            <Image
              src={factoryImages[0]}
              alt="Fengcheng Auto Parts Factory"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-text-primary">{ts('companyIntroduction')}</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-text-secondary">
              Changzhou Fengcheng Import And Export Co., Ltd. is a global supplier of full-vehicle covering parts,
              established in 2025 with a 23,575 square meter factory in Danyang, Jiangsu.
              Equipped with 31 production machines and 9 automated testing instruments,
              the company ensures high efficiency and quality.
            </p>
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

        {/* Capabilities section */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Customization capabilities */}
          <div className="rounded-xl border border-border-light bg-surface p-5 shadow-card">
            <h3 className="mb-4 text-sm font-bold text-text-primary">Customization Capabilities</h3>
            <div className="space-y-3">
              {capabilities.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand/10">
                    <Icon className="h-3.5 w-3.5 text-brand" />
                  </div>
                  <span className="text-sm text-text-secondary">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quality control */}
          <div className="rounded-xl border border-border-light bg-surface p-5 shadow-card">
            <h3 className="mb-4 text-sm font-bold text-text-primary">Quality Control</h3>
            <ul className="space-y-3">
              {qualityItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                  <span className="text-sm text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div className="rounded-xl border border-border-light bg-surface p-5 shadow-card">
            <h3 className="mb-4 text-sm font-bold text-text-primary">Certifications</h3>
            <div className="flex flex-wrap gap-2">
              {company.certifications.concat('EEC').map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border-light bg-surface-subtle px-3.5 py-1.5 text-xs font-semibold text-text-secondary"
                >
                  <CheckCircle className="h-3 w-3 text-success" />
                  {cert}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border-light bg-surface-subtle px-3.5 py-1.5 text-xs font-semibold text-text-secondary">
                <CheckCircle className="h-3 w-3 text-success" />
                ISO 9001
              </span>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-text-tertiary">
              Certified quality management system. Products comply with international automotive standards.
            </p>
          </div>
        </div>

        {/* Factory images gallery */}
        <div className="mt-8">
          <h3 className="mb-4 text-sm font-bold text-text-primary">Factory & Production</h3>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {factoryImages.map((src, i) => (
              <div key={src} className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border-light">
                <Image
                  src={src}
                  alt={`Fengcheng Factory ${i + 1}`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* R&D section */}
        <div className="mt-8 rounded-xl border border-border-light bg-surface p-6 shadow-card">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-bold text-text-primary">R&D Capabilities</h3>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
                  5 R&D engineers (1 post-graduate, 4 graduate)
                </li>
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
                  300+ new products launched per year
                </li>
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
                  540 supply chain partners
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-text-primary">Main Markets</h3>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <Globe className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
                  North America (40%)
                </li>
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <Globe className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
                  Western Europe (30%)
                </li>
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <Globe className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
                  Middle East (20%)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
