'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { TurnstileWidget } from '@/components/inquiry/TurnstileWidget'
import { company } from '@/lib/company'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function ContactPage() {
  const t = useTranslations('contact')
  const ti = useTranslations('inquiry')
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
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bg-[#f5f5f5]">
      <div className="border-b border-zinc-200 bg-white py-8">
        <div className="mx-auto max-w-[1200px] px-4">
          <h1 className="text-xl font-bold text-zinc-900">{t('title')}</h1>
          <p className="mt-1 text-sm text-zinc-600">{company.legalName}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-10 lg:grid-cols-3">
        <aside className="rounded border border-zinc-200 bg-white p-6 lg:col-span-1">
          <h2 className="font-bold text-zinc-900">{t('reachUs')}</h2>
          <ul className="mt-4 space-y-3 text-sm text-zinc-700">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-[#ff6a00]" />{company.location}</li>
            {company.phone && (
              <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-[#ff6a00]" /><a href={`tel:${company.phone}`}>{company.phone}</a></li>
            )}
            {company.contactEmail && company.contactEmail !== 'Contact via inquiry form' && (
              <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-[#ff6a00]" /><a href={`mailto:${company.contactEmail}`}>{company.contactEmail}</a></li>
            )}
          </ul>
          <a href={company.alibabaStoreUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded bg-[#ff6a00] px-5 py-2 text-xs font-semibold text-white hover:bg-[#e85f00]">
            {t('alibaba')}
          </a>
        </aside>

        <form onSubmit={submit} className="space-y-4 rounded border border-zinc-200 bg-white p-6 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <input required placeholder={ti('name')} className="w-full rounded border px-3 py-2.5" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <input required type="email" placeholder={ti('email')} className="w-full rounded border px-3 py-2.5" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            <input placeholder={ti('phone')} className="w-full rounded border px-3 py-2.5" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
            <input placeholder={ti('country')} className="w-full rounded border px-3 py-2.5" value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))} />
          </div>
          <textarea required placeholder={ti('message')} className="w-full rounded border px-3 py-2.5" rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} />
          <TurnstileWidget onVerify={setToken} onExpire={() => setToken(null)} />
          <button type="submit" disabled={status === 'loading'} className="rounded bg-[#ff6a00] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#e85f00] disabled:opacity-60">
            {t('submit')}
          </button>
          {status === 'success' && <p className="text-green-700">{ti('success')}</p>}
          {status === 'error' && <p className="text-red-700">{ti('error')}</p>}
        </form>
      </div>
    </div>
  )
}
