import Avatar from '../Avatar/Avatar'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <h2 className={styles.logo}>Styles</h2>
      <div className={styles.right}>
        <Avatar />
      </div>
    </header>
  )
}