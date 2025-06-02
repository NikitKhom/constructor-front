import React from 'react';
import styles from './Popup.module.css';

interface ErrorPopupProps {
  message: string;
  onClose: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, onClose }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2 className={styles.errorTitle}>Ошибка!</h2>
        <p>{message}</p>
        <button onClick={onClose} className={styles.closeButton}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;