import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { getStyles, saveStyle, updateStyle, deleteStyle, StyleData } from '../api/styles';
import SuccessPopup from '../components/Popups/SuccessPopup';
import ErrorPopup from '../components/Popups/ErrorPopup';

interface StyleContextType {
  styles: StyleData[];
  loadingStyles: boolean;
  fetchStyles: () => Promise<void>;
  saveStyle: (data: { name: string; form_сss: React.CSSProperties; input_сss: React.CSSProperties; button_сss: React.CSSProperties }) => Promise<void>;
  updateStyle: (data: { id: string; name: string; form_сss: React.CSSProperties; input_сss: React.CSSProperties; button_сss: React.CSSProperties }) => Promise<void>;
  deleteStyle: (id: string) => Promise<void>;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

interface StyleProviderProps {
  children: ReactNode;
}

export const StyleProvider: React.FC<StyleProviderProps> = ({ children }) => {
  const [styles, setStyles] = useState<StyleData[]>([]);
  const [loadingStyles, setLoadingStyles] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    setSuccessMessage('');
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
    setErrorMessage('');
  };

  const fetchStyles = useCallback(async () => {
    setLoadingStyles(true);
    try {
      const response = await getStyles();
      setStyles(response);
      console.log('StyleContext: Styles fetched successfully:', response.length, 'styles.');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Неизвестная ошибка.';
      setErrorMessage(`Ошибка загрузки стилей: ${msg}`);
      setShowErrorPopup(true);
      console.error('Ошибка загрузки стилей:', error);
      setStyles([]); // В случае ошибки очищаем стили
    } finally {
      setLoadingStyles(false); // Завершаем загрузку, ставим false
      console.log('StyleContext: fetchStyles finished. loadingStyles set to false.');
    }
  }, []);

  useEffect(() => {
    console.log('StyleProvider: Initial fetchStyles call on mount.');
    fetchStyles();
  }, [fetchStyles]);

  const handleSaveStyle = useCallback(async (data: { name: string; form_css: React.CSSProperties; input_css: React.CSSProperties; button_css: React.CSSProperties }) => {
    try {
      const result = await saveStyle(data);
      setSuccessMessage(result.message || 'Стиль успешно сохранен!');
      setShowSuccessPopup(true);
      await fetchStyles();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Произошла неизвестная ошибка.';
      setErrorMessage(`Ошибка сохранения стиля: ${msg}`);
      setShowErrorPopup(true);
      console.error('Ошибка сохранения стиля:', error);
      throw error;
    }
  }, [fetchStyles]);

  const handleUpdateStyle = useCallback(async (data: { id: string, name: string; form_css: React.CSSProperties; input_css: React.CSSProperties; button_css: React.CSSProperties }) => {
    try {
      const result = await updateStyle(data);
      setSuccessMessage(result.message || 'Стиль успешно обновлен!');
      setShowSuccessPopup(true);
      await fetchStyles();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Произошла неизвестная ошибка.';
      setErrorMessage(`Ошибка обновления стиля: ${msg}`);
      setShowErrorPopup(true);
      console.error('Ошибка обновления стиля:', error);
      throw error;
    }
  }, [fetchStyles]);

  const handleDeleteStyle = useCallback(async (id: string) => {
    try {
      const result = await deleteStyle(id);
      setSuccessMessage(result.message || 'Стиль успешно удален!');
      setShowSuccessPopup(true);
      await fetchStyles();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Произошла неизвестная ошибка.';
      setErrorMessage(`Ошибка удаления стиля: ${msg}`);
      setShowErrorPopup(true);
      console.error('Ошибка удаления стиля:', error);
      throw error;
    }
  }, [fetchStyles]);

  const contextValue = {
    styles,
    loadingStyles,
    fetchStyles,
    saveStyle: handleSaveStyle,
    updateStyle: handleUpdateStyle,
    deleteStyle: handleDeleteStyle,
  };

  return (
    <StyleContext.Provider value={contextValue}>
      {children}
      {showSuccessPopup && (
        <SuccessPopup message={successMessage} onClose={handleCloseSuccessPopup} />
      )}
      {showErrorPopup && (
        <ErrorPopup message={errorMessage} onClose={handleCloseErrorPopup} />
      )}
    </StyleContext.Provider>
  );
};

export const useStyle = () => {
  const context = useContext(StyleContext);
  if (context === undefined) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
};