import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { CheckCircle, Factory, Shield, Award, Cog, TrendingUp } from 'lucide-react'
import { company } from '@/lib/company'
import { alibabaStore } from '@/lib/alibaba-store-data'

const highlights = [
  {
    icon: Shield,
    title: 'Certified Quality',
    desc: 'IATF16949, ISO9001, CCC & E-MARK certified — precision-engineered for global markets.',
  },
  {
    icon: Factory,
    title: '23,575㎡ Factory',
    desc: '30 injection molding machines, 9 automated assembly lines in Danyang, Jiangsu.',
  },
  {
    icon: Award,
    title: 'OEM / ODM Expertise',
    desc: 'Support drawing-based customization, sample processing, and new product co-development.',
  },
  {
    icon: Cog,
    title: 'Full-Vehicle Coverage',
    desc: 'Products covering 98% of vehicle models for Toyota, Jeep, Nissan, Isuzu, BMW, and more.',
  },
  {
    icon: TrendingUp,
    title: 'Proven Track Record',
    desc: `4.8/5 store rating · 92.9% on-time delivery · #7 fastest response in Car Doors.`,
  },
  {
    icon: CheckCircle,
    title: 'End-to-End QC',
    desc: 'Raw material traceability, in-process inspection, finished product testing with 9 instruments.',
  },
]

export async function WhyChooseUs() {
  const t = await getTranslations('store')

  return (
    <section className="bg-white py-16">
      <div className="container-main">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            {company.businessType}
          </span>
          <h2 className="mt-4 text-2xl font-bold text-text-primary md:text-3xl">
            Why Choose <span className="text-brand">Fengcheng</span> Auto Parts?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {alibabaStore.companyIntro}
          </p>
        </div>

        {/* Highlights grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-xl border border-border-light bg-surface p-5 transition-all hover:border-brand/20 hover:shadow-card-hover"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-text-primary">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{desc}</p>
            </div>
          ))}
        </div>

        {/* Certification badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
    </section>
  )
}
