import AuthPageTemplate from '../../components/AuthPageTemplate/AuthPageTemplate';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import SuccessPopup from '../../components/Popups/SuccessPopup';
import ErrorPopup from '../../components/Popups/ErrorPopup';
import styles from '../../components/AuthPageTemplate/AuthPageTemplate.module.css';

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { register: registerFn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    const registrationData = {
      email: form.email,
      password: form.password,
      name: form.name,
    };
  
    const success = await registerFn(registrationData);
  
    setIsLoading(false);

    if (success) {
      setShowSuccessPopup(true);
    } else {
      setErrorMessage('Ошибка регистрации. Пожалуйста, попробуйте еще раз.');
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
    return <LoadingIndicator />;
  }

  return (
    <AuthPageTemplate
      title="Регистрация"
      subtitle="Создайте аккаунт"
      footer={<p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>}
    >
      <input
        className={styles.input}
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        disabled={isLoading || showSuccessPopup || showErrorPopup}
      />
      <input
        className={styles.input}
        name="name"
        type="text"
        placeholder="Имя пользователя"
        value={form.name}
        onChange={handleChange}
        disabled={isLoading || showSuccessPopup || showErrorPopup}
      />
      <input
        className={styles.input}
        name="password"
        type="password"
        placeholder="Пароль"
        value={form.password}
        onChange={handleChange}
        disabled={isLoading || showSuccessPopup || showErrorPopup}
      />
      <button className={styles.button} onClick={handleSubmit} type="submit" disabled={isLoading || showSuccessPopup || showErrorPopup}>
        Зарегистрироваться
      </button>
  
      {showSuccessPopup && <SuccessPopup message="Регистрация прошла успешно! Теперь вы можете войти." onClose={handleCloseSuccessPopup} />}
      {showErrorPopup && <ErrorPopup message={errorMessage} onClose={handleCloseErrorPopup} />}
    </AuthPageTemplate>
  );
}