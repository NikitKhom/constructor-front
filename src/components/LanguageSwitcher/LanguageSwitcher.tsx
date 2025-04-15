import styles from './LanguageSwitcher.module.css'

export default function LanguageSwitcher() {
  return (
    <div className={styles.switcher}>
      <button className={`${styles.langButton} ${styles.active}`}>RU</button>
      <span className={styles.separator}>/</span>
      <button className={styles.langButton}>EN</button>
    </div>
  )
}