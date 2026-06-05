import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'sc02.alicdn.com',
      },
      {
        protocol: 'https',
        hostname: 'sc04.alicdn.com',
      },
      {
        protocol: 'https',
        hostname: 's.alicdn.com',
      },
    ],
  },
}

export default withPayload(withNextIntl(nextConfig))
