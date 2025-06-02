import Avatar from '../Avatar/Avatar'
// import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import styles from './Header.module.css'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header() {

  const [title, setTitle] = useState('');
  const location = useLocation();
  
  useEffect(() => {
    switch (location.pathname) {
      case '/main/account':
        setTitle('Аккаунт');
        break;
      case '/main/styles':
        setTitle('Стили');
        break;
      case '/main/storage':
        setTitle('Архив');
        break;
      default:
        setTitle('');
        break;
    }
  }, [location.pathname]);

  return (
    <header className={styles.header}>
      <h2 className={styles.logo}>{title}</h2>
      <div className={styles.right}>
        {/* <LanguageSwitcher /> */}
        <Avatar />
      </div>
    </header>
  )
}