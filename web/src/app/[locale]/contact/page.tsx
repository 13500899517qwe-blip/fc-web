'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { TurnstileWidget } from '@/components/inquiry/TurnstileWidget'
import { company } from '@/lib/company'

export default function ContactPage() {
  const t = useTranslations('contact')
  const ti = useTranslations('inquiry')
  const locale = useLocale()
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
    setStatus('loading')
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: [],
          locale,
          turnstileToken: token,
          contactOnly: true,
        }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <p className="mt-2 text-zinc-600">{company.legalName}</p>
      <p className="mt-1 text-sm text-zinc-500">{t('location')}</p>
      <a
        href={company.alibabaStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-sm text-blue-700 hover:underline"
      >
        {t('alibaba')}
      </a>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <input
          required
          placeholder={ti('name')}
          className="w-full rounded border px-3 py-2"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <input
          required
          type="email"
          placeholder={ti('email')}
          className="w-full rounded border px-3 py-2"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
        <textarea
          required
          placeholder={ti('message')}
          className="w-full rounded border px-3 py-2"
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        />
        <TurnstileWidget onVerify={setToken} onExpire={() => setToken(null)} />
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 py-3 font-semibold text-white"
        >
          {t('submit')}
        </button>
        {status === 'success' && <p className="text-green-700">Sent.</p>}
        {status === 'error' && <p className="text-red-700">Failed.</p>}
      </form>
    </div>
  )
}
