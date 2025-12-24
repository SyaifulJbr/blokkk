import createMiddleware from 'next-intl/middleware'

const locales = ['en', 'id', 'zh', 'ko', 'ar', 'tr', 'ru', 'pt']
const defaultLocale = 'en'

export default createMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
  localePrefix: 'as-needed'
})

export const config = {
  matcher: ['/((?!_next|.*\\..*).)*']
}
