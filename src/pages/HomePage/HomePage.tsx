import styles from './HomePage.module.css'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>FormBuilder</h1>
        <p className={styles.subtitle}>
          ВКР по теме: <b>Создание многопользовательского конструктора веб-дизайна HTML-элементов</b>
        </p>
        <Link to="/main/styles" className={styles.button}>
          Начать работу
        </Link>
        <p className={styles.author}>Никита Хоменко, 2025</p>
      </div>
    </div>
  )
}
