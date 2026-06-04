import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Inquiries } from './collections/Inquiries'
import { SiteContent } from './collections/SiteContent'
import { locales } from './i18n/routing'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor(),
  localization: {
    locales: [...locales],
    defaultLocale: 'en',
    fallback: true,
  },
  collections: [Users, Media, Categories, Products, Inquiries, SiteContent],
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [
    vercelBlobStorage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      // 生产环境自动使用 Vercel Blob
      // 本地开发时不设置此变量则回退到本地文件存储
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  sharp,
})
