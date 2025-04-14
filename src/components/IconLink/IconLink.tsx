import { Link } from 'react-router-dom'
import styles from './IconLink.module.css'
import { ReactNode } from 'react'

interface IconLinkProps {
  to: string
  icon: ReactNode
  label: string
}

export default function IconLink({ to, icon, label }: IconLinkProps) {
  return (
    <Link to={to} className={styles.link}>
      <span className={styles.icon}>{icon}</span>
      <span>{label}</span>
    </Link>
  )
}
