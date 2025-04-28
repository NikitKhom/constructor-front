import AuthPageTemplate from '../../components/AuthPageTemplate/AuthPageTemplate';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      const success = await login(email, password);
      if (success) {
        const from = location.state?.from as string || '/main/account';
        navigate(from, { replace: true });
      } else {
        // Обработка ошибки входа (например, показать сообщение)
        console.error('Ошибка входа');
        // Можно добавить состояние для отображения сообщения об ошибке
      }
    }
  };

  return (
    <AuthPageTemplate
      title="Вход"
      subtitle="Введите почту и пароль"
      footer={<p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>}
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading} // Блокируем ввод во время загрузки
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading} // Блокируем ввод во время загрузки
      />
      <button onClick={handleSubmit} type="submit" disabled={isLoading}>
        {isLoading ? 'Вход...' : 'Войти'}
      </button>
    </AuthPageTemplate>
  );
}