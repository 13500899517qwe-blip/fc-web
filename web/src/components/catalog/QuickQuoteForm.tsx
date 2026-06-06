'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Send } from 'lucide-react'

type Props = {
  sku: string
  title: string
}

export function QuickQuoteForm({ sku, title }: Props) {
  const t = useTranslations('catalog')
  const locale = useLocale()
  const [form, setForm] = useState({ name: '', email: '', quantity: '1', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message || `Quote request for ${title} (${sku}), Qty: ${form.quantity}`,
          items: [{ sku, title, quantity: parseInt(form.quantity) || 1 }],
          locale,
          contactOnly: false,
        }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
      setForm((f) => ({ ...f, message: '', quantity: '1' }))
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-border-light bg-surface-subtle p-5 shadow-card">
      <h3 className="text-sm font-bold text-text-primary">Quick Quote</h3>
      <p className="mt-1 text-xs text-text-tertiary">Get a price and availability within 4 hours</p>

      <div className="mt-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            required
            placeholder="Your name *"
            className="rounded-lg border border-border-light bg-surface px-3 py-2 text-xs text-text-primary placeholder:text-text-muted transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <input
            required
            type="email"
            placeholder="Email *"
            className="rounded-lg border border-border-light bg-surface px-3 py-2 text-xs text-text-primary placeholder:text-text-muted transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <input
            type="number"
            min="1"
            placeholder="Qty"
            className="rounded-lg border border-border-light bg-surface px-3 py-2 text-xs text-text-primary placeholder:text-text-muted transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            value={form.quantity}
            onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
          />
          <input
            placeholder="Message (optional)"
            className="col-span-2 rounded-lg border border-border-light bg-surface px-3 py-2 text-xs text-text-primary placeholder:text-text-muted transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-brand-dark active:scale-[0.97] disabled:opacity-50"
        >
          {status === 'loading' ? 'Sending...' : <><Send className="h-3.5 w-3.5" /> Request Quote</>}
        </button>

        {status === 'success' && <p className="text-xs font-medium text-success">✓ Quote requested! We&apos;ll be in touch.</p>}
        {status === 'error' && <p className="text-xs font-medium text-error">✗ Failed to send. Try again or email us.</p>}
      </div>
    </form>
  )
}
