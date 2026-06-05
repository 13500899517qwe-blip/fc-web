'use client'

import { MessageCircle } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

export function WhatsAppButton() {
  if (!siteConfig.whatsappNumber) return null

  const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    'Hello, I would like to inquire about Fengcheng auto body parts and lights.',
  )}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
