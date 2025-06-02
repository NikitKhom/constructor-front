// src/pages/StylePage/StylePage.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import StylesPanel from "../../components/StylesPanel/StylesPanel";
import DemoForm from "../../components/DemoForm/DemoForm";
import CodePopup from "../../components/CodePopup/CodePopup";
import SuccessPopup from "../../components/Popups/SuccessPopup";
import ErrorPopup from "../../components/Popups/ErrorPopup";
import { useStyle } from '../../context/StyleContext';
import { toKebabCaseCssString, fromKebabCaseCssString } from '../../utils/cssTransformations';
import style from "./StylePage.module.css";

const StylePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { styles: userStyles, saveStyle, updateStyle, loadingStyles, fetchStyles } = useStyle();
  const [formStyle, setFormStyle] = useState<React.CSSProperties>({
    borderRadius: '0', padding: '10px 15px', backgroundColor: '#ffffff', borderColor: '#cccccc',
    borderWidth: '1px', gap: '10px', fontSize: '16px', color: '#000000', fontFamily: 'Arial',
  });

  const [inputStyle, setInputStyle] = useState<React.CSSProperties>({
    borderRadius: '3px', height: '30px', width: '200px', color: '#000000',
    backgroundColor: '#ffffff', borderColor: '#cccccc', fontSize: '14px', borderWidth: '1px',
  });

  const [buttonStyle, setButtonStyle] = useState<React.CSSProperties>({
    borderRadius: '3px', color: '#ffffff', backgroundColor: '#007bff', borderColor: '#007bff',
    fontSize: '16px', borderWidth: '1px', width: '150px', height: '40px', justifyContent: 'center',
  });


  const [showCodePopup, setShowCodePopup] = useState(false);
  const [generatedCssCode, setGeneratedCssCode] = useState('');
  const [generatedHtmlCode, setGeneratedHtmlCode] = useState('');
  const [styleName, setStyleName] = useState('Мой Стиль');

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [currentEditingStyleId, setCurrentEditingStyleId] = useState<string | null>(null);


  const generateHtmlTemplate = (): string => {
    return `<form class="form-container">
  <div class="form-group">
    <label for="name">Имя:</label>
    <input type="text" id="name" name="name" placeholder="Ваше имя" class="form-input">
  </div>
  <div class="form-group">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" placeholder="Ваш email" class="form-input">
  </div>
  <div class="form-actions">
    <button type="submit" class="form-button">Отправить</button>
  </div>
</form>
`;
  };

  useEffect(() => {
    if (id) {
      console.log('ID на месте');
      if (loadingStyles || userStyles.length === 0) {
        return;
      }
      const styleToEdit = userStyles.find(s => s.id == id);

      if (styleToEdit) {
        console.log('Стиль найден', styleToEdit);
        setCurrentEditingStyleId(id);
        setStyleName(styleToEdit.name);
        setFormStyle(fromKebabCaseCssString(styleToEdit.form_css));
        setInputStyle(fromKebabCaseCssString(styleToEdit.input_css));
        setButtonStyle(fromKebabCaseCssString(styleToEdit.button_css));
      } else {
        setErrorMessage('Стиль с таким ID не найден. Возможно, он был удален или ID некорректен. Создайте новый стиль.');
        setShowErrorPopup(true);
        navigate('/main/styles', { replace: true });
      }
    } else {
      setCurrentEditingStyleId(null);
      setStyleName('Мой Стиль');
      setFormStyle({ borderRadius: '0', padding: '10px 15px', backgroundColor: '#ffffff', borderColor: '#cccccc', borderWidth: '1px', gap: '10px', fontSize: '16px', color: '#000000', fontFamily: 'Arial' });
      setInputStyle({ borderRadius: '3px', height: '30px', width: '200px', color: '#000000', backgroundColor: '#ffffff', borderColor: '#cccccc', fontSize: '14px', borderWidth: '1px' });
      setButtonStyle({ borderRadius: '3px', color: '#ffffff', backgroundColor: '#007bff', borderColor: '#007bff', fontSize: '16px', borderWidth: '1px', width: '150px', height: '40px', justifyContent: 'center' });
    }
  }, [id, userStyles, loadingStyles, navigate]);

  const handleExportCode = () => {
    const formCss = toKebabCaseCssString(formStyle);
    const inputCss = toKebabCaseCssString(inputStyle);
    const buttonCss = toKebabCaseCssString(buttonStyle);

    const fullCss = `/* Стили формы */\n.form-container {\n${formCss}\n}\n\n` +
                    `/* Стили полей ввода */\n.form-input {\n${inputCss}\n}\n\n` +
                    `/* Стили кнопок */\n.form-button {\n${buttonCss}\n}`;
    setGeneratedCssCode(fullCss);

    const htmlTemplate = generateHtmlTemplate();
    setGeneratedHtmlCode(htmlTemplate);

    setShowCodePopup(true);
  };

  const handleCloseCodePopup = () => {
    setShowCodePopup(false);
    setGeneratedCssCode('');
    setGeneratedHtmlCode('');
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    setSuccessMessage('');
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
    setErrorMessage('');
  };

  const handleSaveOrUpdateStyle = async () => {
    const styleData = {
      name: styleName,
      form_css: formStyle,
      input_css: inputStyle,
      button_css: buttonStyle,
    };

    try {
      if (currentEditingStyleId) {
        await updateStyle({ id: currentEditingStyleId, ...styleData });
        setSuccessMessage('Стиль успешно обновлен!');
      } else {
        await saveStyle(styleData);
        setSuccessMessage('Стиль успешно сохранен!');
      }
      setShowSuccessPopup(true);
      navigate('/main/storage');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Произошла неизвестная ошибка.';
      setErrorMessage(`Ошибка: ${msg}`);
      setShowErrorPopup(true);
      console.error('Ошибка при сохранении/обновлении стилей:', error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.demoContainer}>
        <div className={style.styleNameInput}>
          <input
            type="text"
            id="styleName"
            value={styleName}
            onChange={(e) => setStyleName(e.target.value)}
            placeholder="Введите название"
          />
        </div>
        <DemoForm
          formStyle={formStyle}
          inputStyle={inputStyle}
          buttonStyle={buttonStyle}
        />
        <div className={style.buttonWrapper}>
          <button className={style.exportButton} onClick={handleExportCode}>
            Экспортировать
          </button>
          <button className={style.saveButton} onClick={handleSaveOrUpdateStyle}>
            {currentEditingStyleId ? 'Обновить Стиль' : 'Сохранить Стиль'}
          </button>
        </div>
      </div>
      <StylesPanel
        formStyle={formStyle}
        inputStyle={inputStyle}
        buttonStyle={buttonStyle}
        onFormStyleChange={(newStyle) => setFormStyle(prev => ({ ...prev, ...newStyle }))}
        onInputStyleChange={(newStyle) => setInputStyle(prev => ({ ...prev, ...newStyle }))}
        onButtonStyleChange={(newStyle) => setButtonStyle(prev => ({ ...prev, ...newStyle }))}
      />

      {showCodePopup && (
        <CodePopup
          isOpen={showCodePopup}
          htmlCode={generatedHtmlCode}
          cssCode={generatedCssCode}
          onClose={handleCloseCodePopup}
        />
      )}

      {showSuccessPopup && (
        <SuccessPopup
          message={successMessage}
          onClose={handleCloseSuccessPopup}
        />
      )}

      {showErrorPopup && (
        <ErrorPopup
          message={errorMessage}
          onClose={handleCloseErrorPopup}
        />
      )}
    </div>
  );
};

export default StylePage; 