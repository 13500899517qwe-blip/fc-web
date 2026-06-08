'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { TurnstileWidget } from '@/components/inquiry/TurnstileWidget'
import { company } from '@/lib/company'
import { alibabaStore, alibabaCompany } from '@/lib/alibaba-store-data'
import { Mail, MapPin, Phone, Clock, ShieldCheck, MessageSquare } from 'lucide-react'
import { Link } from '@/i18n/navigation'

export default function ContactPage() {
  const t = useTranslations('contact')
  const ti = useTranslations('inquiry')
  const tn = useTranslations('nav')
  const locale = useLocale()
  const [token, setToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', country: '', message: '' })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items: [], locale, turnstileToken: token, contactOnly: true }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
      setForm({ name: '', email: '', company: '', phone: '', country: '', message: '' })
    } catch (e) {
      console.error('[ContactPage] Inquiry submit failed:', e)
      setStatus('error')
    }
  }

  const contactInfo = [
    { icon: MapPin, label: 'Address', value: company.location },
    ...(company.phone ? [{ icon: Phone, label: 'Phone', value: company.phone, href: `tel:${company.phone}` as const }] : []),
    ...(company.contactEmail && company.contactEmail !== 'Contact via inquiry form'
      ? [{ icon: Mail, label: 'Email', value: company.contactEmail, href: `mailto:${company.contactEmail}` as const }]
      : []),
    { icon: Clock, label: 'Response Time', value: alibabaStore.metrics.responseTime },
  ]

  return (
    <div className="bg-surface-muted">
      {/* Header */}
      <div className="border-b border-border-light bg-surface py-10">
        <div className="container-main">
          <span className="inline-block rounded-full bg-brand/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand">
            {t('title')}
          </span>
          <h1 className="mt-3 text-2xl font-bold text-text-primary md:text-3xl">
            {t('getInTouch')}
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            {t('sendRequirements', { time: alibabaStore.metrics.responseTime })}
          </p>
        </div>
      </div>

      <div className="container-main py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left sidebar - Contact info + Trust signals */}
          <aside className="space-y-6 lg:col-span-1">
            {/* Contact cards */}
            <div className="space-y-3">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 rounded-xl border border-border-light bg-surface p-4 shadow-card"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-text-tertiary">{label}</p>
                    {href ? (
                      <a href={href} className="mt-0.5 block text-sm font-semibold text-text-primary transition-colors hover:text-brand">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm font-semibold text-text-primary">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust signals */}
            <div className="rounded-xl border border-border-light bg-surface p-5 shadow-card">
              <h3 className="flex items-center gap-2 text-sm font-bold text-text-primary">
                <ShieldCheck className="h-4 w-4 text-success" />
                {t('whyChooseUs')}
              </h3>
              <ul className="mt-4 space-y-2">
                {alibabaStore.highlights.slice(0, 4).map((h) => (
                  <li key={h} className="flex items-start gap-2 text-xs text-text-secondary">
                    <span className="mt-0.5 text-success">✓</span>
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {company.certifications.map((cert) => (
                  <span key={cert} className="rounded-full bg-surface-subtle px-2.5 py-1 text-[10px] font-semibold text-text-tertiary">
                    {cert}
                  </span>
                ))}
              </div>
              <Link
                href="/about"
                className="mt-4 inline-block text-xs font-semibold text-brand transition-colors hover:text-brand-dark"
              >
                {t('alibaba')} &rarr;
              </Link>
            </div>

            {/* Quick links */}
            <div className="rounded-xl border border-border-light bg-surface p-5 shadow-card">
              <h3 className="flex items-center gap-2 text-sm font-bold text-text-primary">
                <MessageSquare className="h-4 w-4 text-brand" />
                {t('quickLinks')}
              </h3>
              <div className="mt-3 space-y-1.5 text-sm">
                <Link href="/products" className="block text-text-secondary transition-colors hover:text-brand">{t('browseProducts')}</Link>
                <Link href="/faq" className="block text-text-secondary transition-colors hover:text-brand">{tn('faq')}</Link>
                <a href={company.alibabaStoreUrl} target="_blank" rel="noopener noreferrer" className="block text-text-secondary transition-colors hover:text-brand">
                  {company.brandShort} on Alibaba
                </a>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border-light bg-surface p-6 shadow-card md:p-8">
              <h2 className="text-lg font-bold text-text-primary">{t('reachUs')}</h2>
              <p className="mt-1 text-sm text-text-secondary">{t('response')}</p>

              <form onSubmit={submit} className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-text-primary">
                      {ti('name')} <span className="text-error">*</span>
                    </label>
                    <input
                      required
                      placeholder="John Smith"
                      className="mt-1.5 w-full rounded-lg border border-border-light bg-surface-muted px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary">
                      {ti('email')} <span className="text-error">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="john@company.com"
                      className="mt-1.5 w-full rounded-lg border border-border-light bg-surface-muted px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary">{ti('company')}</label>
                    <input
                      placeholder="Your Company Ltd."
                      className="mt-1.5 w-full rounded-lg border border-border-light bg-surface-muted px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary">{ti('phone')}</label>
                    <input
                      placeholder="+86 123 4567 8900"
                      className="mt-1.5 w-full rounded-lg border border-border-light bg-surface-muted px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-text-primary">{ti('country')}</label>
                    <input
                      placeholder="e.g. United States"
                      className="mt-1.5 w-full rounded-lg border border-border-light bg-surface-muted px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      value={form.country}
                      onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary">
                    {ti('message')} <span className="text-error">*</span>
                  </label>
                  <textarea
                    required
                    placeholder="Tell us about the parts you need — include vehicle model, year, and quantity..."
                    className="mt-1.5 w-full rounded-lg border border-border-light bg-surface-muted px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  />
                </div>

                <TurnstileWidget onVerify={setToken} onExpire={() => setToken(null)} />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark hover:shadow-xl active:scale-[0.97] disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>{ti('sending')}</>
                  ) : (
                    <>{t('submit')} <Mail className="h-4 w-4" /></>
                  )}
                </button>

                {status === 'success' && (
                  <div className="rounded-lg bg-success/10 p-4 text-sm font-medium text-success">
                    ✓ {ti('success')}
                  </div>
                )}
                {status === 'error' && (
                  <div className="rounded-lg bg-error/10 p-4 text-sm font-medium text-error">
                    ✗ {ti('error')}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom trust bar */}
      <div className="border-t border-border-light bg-surface py-8">
        <div className="container-main">
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
            <div>
              <p className="text-xl font-bold text-text-primary">{alibabaStore.metrics.storeRating}</p>
              <p className="text-xs text-text-tertiary">{t('rating')}</p>
            </div>
            <div>
              <p className="text-xl font-bold text-text-primary">{alibabaStore.metrics.onTimeDelivery}</p>
              <p className="text-xs text-text-tertiary">{t('response')}</p>
            </div>
            <div>
              <p className="text-xl font-bold text-text-primary">{alibabaStore.metrics.responseTime}</p>
              <p className="text-xs text-text-tertiary">{t('b2bNote')}</p>
            </div>
            <div>
              <p className="text-xl font-bold text-text-primary">{company.certifications.length}</p>
              <p className="text-xs text-text-tertiary">{t('title')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
