'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useInquiryBasket } from '@/components/inquiry/InquiryBasketProvider'
import { TurnstileWidget } from '@/components/inquiry/TurnstileWidget'
import { Link } from '@/i18n/navigation'
import { ShoppingBag, Trash2, ArrowRight, Send, ShieldCheck } from 'lucide-react'

export default function InquiryPage() {
  const t = useTranslations('inquiry')
  const locale = useLocale()
  const { items, removeItem, clear } = useInquiryBasket()
  const [token, setToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    country: '',
    message: '',
  })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return
    setStatus('loading')
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items, locale, turnstileToken: token }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
      clear()
      setForm({ name: '', email: '', company: '', phone: '', country: '', message: '' })
      setToken(null)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bg-surface-muted min-h-[70vh]">
      <div className="border-b border-border-light bg-surface py-8">
        <div className="container-main">
          <h1 className="text-2xl font-bold text-text-primary md:text-3xl">{t('title')}</h1>
          <p className="mt-1 text-sm text-text-secondary">
            {items.length > 0
              ? `${items.length} product(s) in your basket — fill in your details and we'll reply within 4 hours`
              : 'Add products from our catalog to get started'}
          </p>
        </div>
      </div>

      <div className="container-main py-8">
        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border-light bg-surface px-6 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
              <ShoppingBag className="h-8 w-8 text-brand" />
            </div>
            <h2 className="mt-5 text-lg font-bold text-text-primary">{t('empty')}</h2>
            <p className="mt-2 max-w-sm text-sm text-text-tertiary">
              Browse our catalog of auto body parts and add items to your inquiry basket
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark active:scale-[0.97]"
            >
              {t('browse')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Left: Items + Form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Items list */}
              <div className="rounded-xl border border-border-light bg-surface shadow-card">
                <div className="flex items-center justify-between border-b border-border-light px-5 py-3">
                  <p className="text-sm font-semibold text-text-primary">
                    Products ({items.length})
                  </p>
                  <button
                    type="button"
                    onClick={clear}
                    className="text-xs font-medium text-error transition-colors hover:text-error/80"
                  >
                    Clear all
                  </button>
                </div>
                <ul className="divide-y divide-border-light">
                  {items.map((item) => (
                    <li key={item.sku} className="flex items-center justify-between px-5 py-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-text-primary line-clamp-1">{item.title}</p>
                        <div className="mt-1 flex items-center gap-3 text-xs text-text-tertiary">
                          <span className="font-mono">{item.sku}</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.sku)}
                        className="ml-4 flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-error/10 hover:text-error"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Form */}
              <div className="rounded-xl border border-border-light bg-surface p-6 shadow-card md:p-8">
                <h2 className="text-base font-bold text-text-primary">Your Details</h2>

                <form onSubmit={submit} className="mt-5 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {(['name', 'email', 'company', 'phone', 'country'] as const).map((field) => (
                      <div key={field} className={field === 'country' ? 'sm:col-span-2' : ''}>
                        <label className="block text-sm font-medium text-text-primary">
                          {t(field)}
                          {(field === 'name' || field === 'email') && <span className="text-error">*</span>}
                        </label>
                        <input
                          required={field === 'name' || field === 'email'}
                          type={field === 'email' ? 'email' : 'text'}
                          placeholder={
                            field === 'name' ? 'John Smith' :
                            field === 'email' ? 'john@company.com' :
                            field === 'company' ? 'Your Company Ltd.' :
                            field === 'phone' ? '+86 123 4567 8900' :
                            'e.g. United States'
                          }
                          className="mt-1.5 w-full rounded-lg border border-border-light bg-surface-muted px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                          value={form[field]}
                          onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary">{t('message')}</label>
                    <textarea
                      className="mt-1.5 w-full rounded-lg border border-border-light bg-surface-muted px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      rows={4}
                      placeholder="Tell us more about your requirements — target price, quantity, delivery timeline..."
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    />
                  </div>

                  <TurnstileWidget onVerify={setToken} onExpire={() => setToken(null)} />

                  <button
                    type="submit"
                    disabled={status === 'loading' || items.length === 0}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      'Sending...'
                    ) : (
                      <><Send className="h-4 w-4" /> {t('submit')}</>
                    )}
                  </button>

                  {status === 'success' && (
                    <div className="rounded-lg bg-success/10 p-4 text-sm font-medium text-success">
                      ✓ {t('success')}
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="rounded-lg bg-error/10 p-4 text-sm font-medium text-error">
                      ✗ {t('error')}
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Right sidebar */}
            <aside className="lg:col-span-1">
              <div className="rounded-xl bg-surface-dark p-6 text-text-on-dark shadow-card">
                <h2 className="flex items-center gap-2 text-base font-bold text-white">
                  <ShieldCheck className="h-5 w-5 text-brand" />
                  {t('sidebarTitle')}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-on-dark/80">
                  {t('sidebarBody')}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-text-on-dark/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-brand">✓</span>
                    Personalized quotes within 4 hours
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-brand">✓</span>
                    OEM/ODM customization available
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-brand">✓</span>
                    Factory-direct pricing
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-brand">✓</span>
                    IATF16949 & ISO9001 certified
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
