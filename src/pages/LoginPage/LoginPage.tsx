import AuthPageTemplate from '../../components/AuthPageTemplate/AuthPageTemplate';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import SuccessPopup from '../../components/Popups/SuccessPopup';
import ErrorPopup from '../../components/Popups/ErrorPopup';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import styles from '../../components/AuthPageTemplate/AuthPageTemplate.module.css';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      const success = await login(email, password);
      if (success) {
        setShowSuccessPopup(true);
      } else {
        setErrorMessage('Неверный email или пароль.');
        setShowErrorPopup(true);
      }
    } else {
      setErrorMessage('Пожалуйста, заполните все поля.');
      setShowErrorPopup(true);
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    navigate('/main/styles');
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  if (isLoading) {
      return <LoadingIndicator />
    }

  return (
    <AuthPageTemplate
      title="Вход"
      subtitle="Введите почту и пароль"
      footer={<p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>}
    >
      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading || showSuccessPopup || showErrorPopup}
      />
      <input
        className={styles.input}
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading || showSuccessPopup || showErrorPopup}
      />
      <button className={styles.button} onClick={handleSubmit} type="submit" disabled={isLoading || showSuccessPopup || showErrorPopup}>
        Войти
      </button>

      {showSuccessPopup && <SuccessPopup message="Вход выполнен успешно!" onClose={handleCloseSuccessPopup} />}
      {showErrorPopup && <ErrorPopup message={errorMessage} onClose={handleCloseErrorPopup} />}
    </AuthPageTemplate>
  );
}