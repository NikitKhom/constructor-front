import React from 'react';
import styles from './DemoForm.module.css';

interface DemoFormProps {
  formStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
}

const DemoForm: React.FC<DemoFormProps> = ({ formStyle, inputStyle, buttonStyle }) => {
  return (
    <form className={styles.form} style={{ ...formStyle }}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Имя:</label>
        <input type="text" id="name" defaultValue="Ваше имя" className={styles.input} style={inputStyle} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" defaultValue="example@email.com" className={styles.input} style={inputStyle} />
      </div>
      <div style={{ display: 'flex', justifyContent: (buttonStyle as { justifyContent?: 'center' | 'flex-start' | 'flex-end' })?.justifyContent || 'center' }} >
        <button type="submit" className={styles.button} style={buttonStyle} onClick={(e) => e.preventDefault()}>Отправить</button>
      </div>
      
    </form>
  );
};

export default DemoForm;