import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { alibabaStore } from '@/lib/alibaba-store-data'
import { company } from '@/lib/company'
import { Factory, Users, MapPin, Wrench } from 'lucide-react'

export async function FactoryShowcase() {
  const t = await getTranslations('about')
  const ts = await getTranslations('store')
  const f = await getTranslations('factory')

  const facts = [
    { icon: Factory, label: ts('founded'), value: alibabaStore.companyFacts.founded },
    { icon: Users, label: ts('employees'), value: alibabaStore.companyFacts.employees },
    { icon: Wrench, label: t('machines'), value: `${company.productionMachines} units` },
    { icon: MapPin, label: t('floorspace'), value: company.floorspace },
  ]

  return (
    <section className="bg-surface-subtle py-16">
      <div className="container-main">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Image grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={alibabaStore.profileImages[0]}
                alt="Factory"
                fill
                className="object-cover transition duration-500 hover:scale-105"
                unoptimized
              />
            </div>
            <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={alibabaStore.profileImages[1]}
                alt="Production line"
                fill
                className="object-cover transition duration-500 hover:scale-105"
                unoptimized
              />
            </div>
            <div className="relative -mt-6 aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={alibabaStore.profileImages[2]}
                alt="Workshop"
                fill
                className="object-cover transition duration-500 hover:scale-105"
                unoptimized
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={alibabaStore.profileImages[3]}
                alt="Quality control"
                fill
                className="object-cover transition duration-500 hover:scale-105"
                unoptimized
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="inline-block rounded-full bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              {ts('companyProfile')}
            </span>
            <h2 className="mt-4 text-2xl font-bold text-text-primary md:text-3xl">
              {company.legalName}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">{f('companyIntro')}</p>

            {/* Key facts */}
            <dl className="mt-6 grid grid-cols-2 gap-4">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <dt className="text-xs text-text-tertiary">{label}</dt>
                    <dd className="text-sm font-semibold text-text-primary">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-dark active:scale-[0.97]"
              >
                {ts('learnMoreAboutUs')}
              </Link>
              <Link
                href="/inquiry"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-5 py-2.5 text-sm font-semibold text-text-primary transition-all hover:border-brand/30 hover:text-brand active:scale-[0.97]"
              >
                {ts('contactSupplier')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
