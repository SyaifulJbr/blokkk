import { getRequestConfig } from 'next-intl/server'

const locales = ['en', 'id', 'zh', 'ko', 'ar', 'tr', 'ru', 'pt']

export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  }
})