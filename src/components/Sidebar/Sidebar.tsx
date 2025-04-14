import styles from './Sidebar.module.css'

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.title}>FormConstructor</h1>
      <nav>
        <ul className={styles.list}>
          <li><a href="/styles">Стили</a></li>
          <li><a href="/forms">Формы</a></li>
          <li><a href="/account">Профиль</a></li>
        </ul>
      </nav>
    </aside>
  )
}