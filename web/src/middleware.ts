import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    '/',
    '/(en|fr|de|es|ru|ja|ar|pt)/:path*',
    '/((?!admin|api|_next|_vercel|.*\\..*).*)',
  ],
}
