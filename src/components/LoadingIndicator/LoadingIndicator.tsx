import styles from './LoadingIndicator.module.css';

export default function LoadingIndicator() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Загрузка...</p>
    </div>
  );
};
