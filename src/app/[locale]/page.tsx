import { useFormatter, useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'
import styles from './page.module.css'

const projects = [
  { id: 'web', name: 'Website', tasks: 12, updated: new Date(2026, 9, 9) },
  { id: 'app', name: 'Mobile app', tasks: 1, updated: new Date(2026, 9, 7) },
  { id: 'docs', name: 'Docs', tasks: 0, updated: new Date(2026, 8, 30) }
]

export default function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  setRequestLocale(locale)

  const t = useTranslations('dashboard')
  const format = useFormatter()

  return (
    <>
      <h1>{t('title')}</h1>
      <p>{t('welcome', { name: 'Sara' })}</p>
      <p>{t('projects', { count: projects.length })}</p>
      <ul className={styles.list}>
        {projects.map((project) => (
          <li key={project.id} className={styles.project}>
            <strong>{project.name}</strong>
            <span>{t('openTasks', { count: project.tasks })}</span>
            <small>{t('updated', { date: format.dateTime(project.updated, { dateStyle: 'medium' }) })}</small>
          </li>
        ))}
      </ul>
      <button type="button">{t('newProject')}</button>
    </>
  )
}
