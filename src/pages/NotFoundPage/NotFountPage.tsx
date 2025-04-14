import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
 

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>404</h1>
      <p className={styles.message}>Упс! Страница не найдена.</p>
      <button  onClick={() => navigate(-1)} className={styles.backBtn}>Вернуться назад</button>
    </div>
  );
}

