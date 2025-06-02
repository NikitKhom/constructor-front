import { useState, useEffect } from 'react';
import styles from './AccountPage.module.css';
import { updateUser } from '../../api/user';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import SuccessPopup from '../../components/Popups/SuccessPopup';
import ErrorPopup from '../../components/Popups/ErrorPopup';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import avatar from '../../assets/images/DefaultAvatar.png';

export default function AccountPage() {
  const { userData, logout } = useAuth();
  const [form, setForm] = useState({
    email: userData?.email || '',
    name: userData?.name || '',
    avatar: userData?.avatar || '',
    password: '',
  });
  const [initialForm, setInitialForm] = useState({
    email: userData?.email || '',
    name: userData?.name || '',
    avatar: userData?.avatar || '',
    password: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setForm({ email: userData.email, name: userData.name, avatar: userData.avatar || '', password: '' });
      setInitialForm({ email: userData.email, name: userData.name, avatar: userData.avatar || '', password: '' });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const updateData: { name?: string; password?: string; avatar?: string } = {};
    if (form.name !== initialForm.name) {
      updateData.name = form.name;
    }
    if (form.password) {
      updateData.password = form.password;
    }
    if (form.avatar !== initialForm.avatar) {
      updateData.avatar = form.avatar;
    }

    const updatedUser = await updateUser(updateData);
    setIsSaving(false);

    if (updatedUser) {
      setInitialForm(form);
      setShowSuccessPopup(true);
    } else {
      setErrorMessage('Не удалось сохранить данные аккаунта.');
      setShowErrorPopup(true);
    }
  };

  const handleLogout = async () => {
    navigate('/welcome');
    await logout();
  };

  if (!userData) {
    return <LoadingIndicator />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarContainer}>
        <img
          src={form.avatar || avatar}
          alt="Аватар пользователя"
          className={styles.avatar}
        />
      </div>
      <form className={styles.form} onSubmit={handleSave}>
        <label>
          Email:
          <input name="email" value={form.email} onChange={handleChange} readOnly />
        </label>
        <label>
          Name:
          <input name="name" value={form.name} onChange={handleChange} />
        </label>
        <label>
          Avatar URL:
          <input name="avatar" value={form.avatar} onChange={handleChange} placeholder="URL аватара" />
        </label>
        <label>
          Новый пароль:
          <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Оставьте пустым, чтобы не менять" />
        </label>
        <button type="submit" disabled={isSaving || JSON.stringify(form) === JSON.stringify(initialForm)}>
          Сохранить
        </button>
      </form>
      <button className={styles.logoutBtn} type="button" onClick={handleLogout}>
        Выйти
      </button>
      {showSuccessPopup && <SuccessPopup message="Данные аккаунта успешно сохранены!" onClose={() => setShowSuccessPopup(false)} />}
      {showErrorPopup && <ErrorPopup message={errorMessage} onClose={() => setShowErrorPopup(false)} />}
    </div>
  );
}