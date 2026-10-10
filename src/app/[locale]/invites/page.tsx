import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'

export default function InvitesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  setRequestLocale(locale)

  const t = useTranslations('invites')

  return (
    <>
      <h1>{t('title')}</h1>
      <p>{t('sent', { count: 3 })}</p>
      <p>{t('role', { role: 'admin' })}</p>
      <p>{t.rich('expires', { days: 7, strong: (chunks) => <strong>{chunks}</strong> })}</p>
      <p>{t('rank', { place: 2 })}</p>
      <button type="button">{t('resend')}</button>
    </>
  )
}
