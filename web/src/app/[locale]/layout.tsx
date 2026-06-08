import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Geist, Geist_Mono } from 'next/font/google'
import { hasLocale } from 'next-intl'
import { routing, rtlLocales, type AppLocale } from '@/i18n/routing'
import { TopBar } from '@/components/layout/TopBar'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { InquiryBasketProvider } from '@/components/inquiry/InquiryBasketProvider'
import { getCategoryTree } from '@/lib/catalog-queries'
import { jsonLdOrganization } from '@/lib/json-ld'
import '../globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  let categoryTree: Awaited<ReturnType<typeof getCategoryTree>> = []
  try {
    categoryTree = await getCategoryTree(locale as AppLocale)
  } catch (e) {
    console.error('[Layout] categoryTree fetch failed:', e)
  }

  const messages = await getMessages()
  const dir = rtlLocales.includes(locale as AppLocale) ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization(locale as AppLocale)) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface-muted text-zinc-900">
        <NextIntlClientProvider messages={messages}>
          <InquiryBasketProvider>
            <TopBar />
            <SiteHeader categoryTree={categoryTree} />
            <main className="flex-1">{children}</main>
            <SiteFooter categoryTree={categoryTree} />
            <WhatsAppButton />
          </InquiryBasketProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
