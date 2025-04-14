import { NavLink } from 'react-router-dom'
import styles from './IconLink.module.css'
import { ReactNode } from 'react'

interface IconLinkProps {
  to: string
  icon: ReactNode
  label: string
}

export default function IconLink({ to, icon, label }: IconLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.active : ''}`
      }
    >
      <div className={styles.marker} />
      <span className={styles.icon}>{icon}</span>
      <span>{label}</span>
    </NavLink>
  )
}
