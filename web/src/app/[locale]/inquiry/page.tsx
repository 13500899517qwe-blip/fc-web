'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useInquiryBasket } from '@/components/inquiry/InquiryBasketProvider'
import { TurnstileWidget } from '@/components/inquiry/TurnstileWidget'
import { Link } from '@/i18n/navigation'
import { ShoppingBag } from 'lucide-react'

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
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-zinc-300 bg-white px-8 py-16 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-zinc-400" />
          <p className="mt-4 text-zinc-600">{t('empty')}</p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-lg bg-blue-800 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {t('browse')}
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.sku}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-5 py-4 shadow-sm"
                >
                  <div>
                    <p className="font-semibold text-zinc-900">{item.title}</p>
                    <p className="font-mono text-xs text-zinc-500">
                      {item.sku} × {item.quantity}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.sku)}
                    className="text-sm font-medium text-red-600 hover:underline"
                  >
                    {t('remove')}
                  </button>
                </li>
              ))}
            </ul>
            <form onSubmit={submit} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
              {(['name', 'email', 'company', 'phone', 'country'] as const).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-zinc-700">{t(field)}</label>
                  <input
                    required={field === 'name' || field === 'email'}
                    type={field === 'email' ? 'email' : 'text'}
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    value={form[field]}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-zinc-700">{t('message')}</label>
                <textarea
                  className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                />
              </div>
              <TurnstileWidget onVerify={setToken} onExpire={() => setToken(null)} />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-lg bg-blue-800 py-3.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {t('submit')}
              </button>
              {status === 'success' && <p className="text-green-700 text-sm">{t('success')}</p>}
              {status === 'error' && <p className="text-red-700 text-sm">{t('error')}</p>}
            </form>
          </div>
          <aside className="rounded-2xl bg-blue-950 p-6 text-blue-100">
            <h2 className="text-lg font-semibold text-white">{t('sidebarTitle')}</h2>
            <p className="mt-3 text-sm leading-relaxed">{t('sidebarBody')}</p>
          </aside>
        </div>
      )}
    </div>
  )
}
