import styles from './AuthPageTemplate.module.css'
import { ReactNode } from 'react'

interface Props {
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}

export default function AuthPageTemplate({ title, subtitle, children, footer }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <form className={styles.form}>
          {children}
        </form>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  )
}
