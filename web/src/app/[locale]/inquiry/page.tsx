'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useInquiryBasket } from '@/components/inquiry/InquiryBasketProvider'
import { TurnstileWidget } from '@/components/inquiry/TurnstileWidget'
import { Link } from '@/i18n/navigation'

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
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      {items.length === 0 ? (
        <p className="mt-6 text-zinc-600">
          {t('empty')}{' '}
          <Link href="/products" className="text-blue-700 underline">
            Browse products
          </Link>
        </p>
      ) : (
        <>
          <ul className="mt-6 space-y-3">
            {items.map((item) => (
              <li
                key={item.sku}
                className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-zinc-500">{item.sku} × {item.quantity}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.sku)}
                  className="text-sm text-red-600 hover:underline"
                >
                  {t('remove')}
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={submit} className="mt-10 space-y-4">
            {(['name', 'email', 'company', 'phone', 'country'] as const).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium">{t(field)}</label>
                <input
                  required={field === 'name' || field === 'email'}
                  type={field === 'email' ? 'email' : 'text'}
                  className="mt-1 w-full rounded border border-zinc-300 px-3 py-2"
                  value={form[field]}
                  onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium">{t('message')}</label>
              <textarea
                className="mt-1 w-full rounded border border-zinc-300 px-3 py-2"
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              />
            </div>
            <TurnstileWidget onVerify={setToken} onExpire={() => setToken(null)} />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-lg bg-blue-700 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
            >
              {t('submit')}
            </button>
            {status === 'success' && <p className="text-green-700">{t('success')}</p>}
            {status === 'error' && <p className="text-red-700">{t('error')}</p>}
          </form>
        </>
      )}
    </div>
  )
}
