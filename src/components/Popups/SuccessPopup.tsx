import React from 'react';
import styles from './Popup.module.css';

interface SuccessPopupProps {
  message: string;
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message, onClose }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2 className={styles.successTitle}>Успешно!</h2>
        <p>{message}</p>
        <button onClick={onClose} className={styles.closeButton}>
          ОК
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;