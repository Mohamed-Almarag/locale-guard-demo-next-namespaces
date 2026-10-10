import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

// Each language is a folder, and each file in it is a namespace:
// messages/ar/dashboard.json holds the `dashboard` messages in Arabic.
export const namespaces = ['common', 'dashboard'] as const

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const file = await import(`../../messages/${locale}/${namespace}.json`)
      return [namespace, file.default] as const
    })
  )

  return { locale, messages: Object.fromEntries(entries) }
})
