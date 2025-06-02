import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStyle } from '../../context/StyleContext';
import styles from './StoragePage.module.css';

const StoragePage: React.FC = () => {

  const { styles: userStyles, loadingStyles, deleteStyle, fetchStyles } = useStyle();
  const navigate = useNavigate();




  useEffect(() => {
    console.log('StoragePage: Calling fetchStyles.');
    fetchStyles();
    console.log(userStyles);
  }, [fetchStyles]);

  const handleDelete = async (styleId: string) => {
    try {
      await deleteStyle(styleId);
    } catch (error) {
      console.error("Ошибка при удалении стиля в компоненте StoragePage:", error);
    }
  };

  const handleEdit = (styleId: string) => {
    navigate(`/main/styles/${styleId}`);
  };

  return (
    <div className={styles.storageContainer}>
      <h2>Ваше хранилище стилей</h2>
      {loadingStyles ? (
        <p>Загрузка стилей...</p>
      ) : userStyles.length === 0 ? (
        <p>У вас пока нет сохраненных стилей. <a onClick={() => navigate('/main/styles')} style={{ cursor: 'pointer', color: '#007bff' }}>Создайте новый!</a></p>
      ) : (
        <ul className={styles.styleList}>
          {userStyles.map((styleItem) => (
            <li key={styleItem.id} className={styles.styleItem}>
              <span className={styles.styleName}>{styleItem.name}</span>
              <div className={styles.actions}>
                <button
                  className={styles.editButton}
                  onClick={() => handleEdit(styleItem.id)}
                >
                  Применить
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(styleItem.id)}
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StoragePage;