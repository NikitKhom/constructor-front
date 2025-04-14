import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <h2 className={styles.logo}>Styles</h2>
      <div className={styles.right}>
        <button className={styles.profileBtn}>Профиль</button>
        <button className={styles.logoutBtn}>Выйти</button>
      </div>
    </header>
  )
}