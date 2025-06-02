import React, { useState, ChangeEvent } from 'react';
import styles from './StylesPanel.module.css';
import FormSection from '../FormSection/FormSection';
import Controller from '../Controller/Controller';
import ColorSelect from '../ColorSelect/ColorSelect';
import Radio from '../Radio/Radio';

interface StylesPanelProps {
  formStyle: any,
  inputStyle: any,
  buttonStyle: any,
  onFormStyleChange: (styles: React.CSSProperties) => void;
  onInputStyleChange: (styles: React.CSSProperties) => void;
  onButtonStyleChange: (styles: React.CSSProperties) => void;
}

const fontOptions = ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Courier New'];

const StylesPanel: React.FC<StylesPanelProps> = ({
  formStyle,
  inputStyle,
  buttonStyle,
  onFormStyleChange,
  onInputStyleChange,
  onButtonStyleChange,
}) => {

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    switch (name) {
      case 'inputBorderRadius':
        onInputStyleChange({ borderRadius: value + 'px' });
        break;
      case 'inputHeight':
        onInputStyleChange({ height: value + 'px' });
        break;
      case 'inputWidth':
        onInputStyleChange({ width: value + 'px' });
        break;
      case 'inputTextColor':
        onInputStyleChange({ color: value });
        break;
      case 'inputBackgroundColor':
        onInputStyleChange({ backgroundColor: value });
        break;
      case 'inputBorderColor':
        onInputStyleChange({ borderColor: value });
        break;
      case 'inputFontSize':
        onInputStyleChange({ fontSize: value + 'px' });
        break;
      case 'inputBorderWidth':
        onInputStyleChange({ borderWidth: value + 'px' });
        break;
      case 'inputBorderBottomOnly':
        onInputStyleChange({
          borderTop: checked ? 'none' : `${inputStyle.borderWidth}px solid ${inputStyle.borderColor}`,
          borderLeft: checked ? 'none' : `${inputStyle.borderWidth}px solid ${inputStyle.borderColor}`,
          borderRight: checked ? 'none' : `${inputStyle.borderWidth}px solid ${inputStyle.borderColor}`,
          borderBottom: `${inputStyle.borderWidth}px solid ${inputStyle.borderColor}`,
        });
        break;
      case 'buttonBorderRadius':
        onButtonStyleChange({ borderRadius: value + 'px' });
        break;
      case 'buttonTextColor':
        onButtonStyleChange({ color: value });
        break;
      case 'buttonBackgroundColor':
        onButtonStyleChange({ backgroundColor: value });
        break;
      case 'buttonBorderColor':
        onButtonStyleChange({ borderColor: value });
        break;
      case 'buttonFontSize':
        onButtonStyleChange({ fontSize: value + 'px' });
        break;
      case 'buttonBorderWidth':
        onButtonStyleChange({ borderWidth: value + 'px' });
        break;
      case 'buttonAlignment':
        onButtonStyleChange({ justifyContent: value });
        break;
      case 'buttonWidth':
        onButtonStyleChange({ width: value + 'px' });
        break;
      case 'buttonHeight':
        onButtonStyleChange({ height: value + 'px' });
        break;
      case 'formGap':
        onFormStyleChange({ gap: value + 'px' });
        break;
      case 'formBorderWidth':
        onFormStyleChange({ borderWidth: value + 'px' });
        break;
      case 'formTextColor':
        onFormStyleChange({ color: value });
        break;
      case 'formBackgroundColor':
        onFormStyleChange({ backgroundColor: value });
        break;
      case 'formBorderColor':
        onFormStyleChange({ borderColor: value });
        break;
      case 'formBorderRadius':
        onFormStyleChange({ borderRadius: value + 'px' });
        break;
      case 'formFontSize':
        onFormStyleChange({ fontSize: value + 'px' });
        break;
      case 'formFontFamily':
        onFormStyleChange({ fontFamily: value });
        onInputStyleChange({ fontFamily: value });
        onButtonStyleChange({ fontFamily: value });
        break;
      case 'formPaddingHorizontal':
        onFormStyleChange({ padding: `${formStyle.padding?.split(' ')[0] ?? '15px'} ${value}px` });
        break;
      case 'formPaddingVertical':
        onFormStyleChange({ padding: `${value}px ${formStyle.padding?.split(' ')[1] ?? '15px'}` });
        break;
    }
  };

  const formColorsInfo = [
    { name: 'formTextColor', title: 'Цвет текста', value: formStyle.color },
    { name: 'formBackgroundColor', title: 'Цвет фона', value: formStyle.backgroundColor },
    { name: 'formBorderColor', title: 'Цвет границы', value: formStyle.borderColor },
  ];

  const inputColorsInfo = [
    { name: 'inputTextColor', title: 'Цвет текста', value: inputStyle.color },
    { name: 'inputBackgroundColor', title: 'Цвет фона', value: inputStyle.backgroundColor },
    { name: 'inputBorderColor', title: 'Цвет границы', value: inputStyle.borderColor },
  ];

  const buttonColorsInfo = [
    { name: 'buttonTextColor', title: 'Цвет текста', value: buttonStyle.color },
    { name: 'buttonBackgroundColor', title: 'Цвет фона', value: buttonStyle.backgroundColor },
    { name: 'buttonBorderColor', title: 'Цвет границы', value: buttonStyle.borderColor },
  ];

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>Параметры стилей</h2>

      <FormSection title="Форма">
        
          <Controller
            title="Радиус скругления"
            name="formBorderRadius"
            onChange={handleInputChange}
            range={{ min: 0, max: 30 }}
            value={formStyle.borderRadius.slice(0, -2)}
          />
        
          <Controller
            title="Вертикальный отступ"
            name="formPaddingVertical"
            onChange={handleInputChange}
            range={{ min: 0, max: 50 }}
            value={formStyle.padding.split(' ')[0].slice(0, -2)}
          />
        
          <Controller
            title="Горизонтальный отступ"
            name="formPaddingHorizontal"
            onChange={handleInputChange}
            range={{ min: 0, max: 50 }}
            value={formStyle.padding.split(' ')[1].slice(0, -2)}
          />
        
          <Controller
            title="Внутренний отступ"
            name="formGap"
            onChange={handleInputChange}
            range={{ min: 0, max: 30 }}
            value={formStyle.gap.slice(0, -2)}
          />
        
          <Controller
            title="Размер шрифта"
            name="formFontSize"
            onChange={handleInputChange}
            range={{ min: 8, max: 24 }}
            value={formStyle.fontSize.slice(0, -2)} 
          />
        <div>
          <label htmlFor="formFontFamily">Шрифт:</label>
          <select name="formFontFamily" id="formFontFamily" value={formStyle.fontFamily} onChange={handleInputChange}>
            {fontOptions.map((font) => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>
        
          <Controller
            title="Ширина границы"
            name="formBorderWidth"
            onChange={handleInputChange}
            range={{ min: 0, max: 8 }}
            value={formStyle.borderWidth.slice(0, -2)}
          />
        
          <ColorSelect colorsInfo={formColorsInfo} onChange={handleInputChange} />
      </FormSection>

      <FormSection title="Инпуты">
        <Controller
          title="Радиус скругления"
          name="inputBorderRadius"
          onChange={handleInputChange}
          range={{ min: 0, max: 20 }}
          value={inputStyle.borderRadius.slice(0, -2)}
        />
        <Controller
          title="Высота"
          name="inputHeight"
          onChange={handleInputChange}
          range={{ min: 20, max: 60 }}
          value={inputStyle.height.slice(0, -2)}
        />
        
        <Controller
          title="Ширина"
          name="inputWidth"
          onChange={handleInputChange}
          range={{ min: 100, max: 400 }}
          value={inputStyle.width.slice(0, -2)}
        />

        
        <Controller
          title="Размер шрифта"
          name="inputFontSize"
          onChange={handleInputChange}
          range={{ min: 8, max: 20 }}
          value={inputStyle.fontSize.slice(0, -2)}
        />
        <Controller
          title="Ширина границы"
          name="inputBorderWidth"
          onChange={handleInputChange}
          range={{ min: 0, max: 5 }}
          value={inputStyle.borderWidth.slice(0, -2)}
        />
        <div>
          <label>
            Только нижняя граница:
            <input
              type="checkbox"
              name="inputBorderBottomOnly"
              // checked={isInputBorderBottomOnly}  
              onChange={handleInputChange}
            />
          </label>
        </div>
        
        <ColorSelect colorsInfo={inputColorsInfo} onChange={handleInputChange} />
      </FormSection>

      <FormSection title="Кнопка">
        
          <Controller
            title="Радиус скругления"
            name="buttonBorderRadius"
            onChange={handleInputChange}
            range={{ min: 0, max: 20 }}
            value={buttonStyle.borderRadius.slice(0, -2)}
          />
        
          <Controller
            title="Ширина"
            name="buttonWidth"
            onChange={handleInputChange}
            range={{ min: 50, max: 300 }}
            value={buttonStyle.width.slice(0, -2)}
          />
        
          <Controller
            title="Высота"
            name="buttonHeight"
            onChange={handleInputChange}
            range={{ min: 30, max: 80 }}
            value={buttonStyle.height.slice(0, -2)}
          />
        
          <Controller
            title="Размер шрифта"
            name="buttonFontSize"
            onChange={handleInputChange}
            range={{ min: 12, max: 24 }}
            value={buttonStyle.fontSize.slice(0, -2)}
          />
        
          <Controller
            title="Ширина границы"
            name="buttonBorderWidth"
            onChange={handleInputChange}
            range={{ min: 0, max: 5 }}
            value={buttonStyle.borderWidth.slice(0, -2)}
          />
        <div>
          <label>Выравнивание:</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Radio
              title="По центру"
              value="center"
              name="buttonAlignment"
              onChange={handleInputChange}
              isChecked={buttonStyle.justifyContent}
            />
            <Radio
              title="Слева"
              value="flex-start"
              name="buttonAlignment"
              onChange={handleInputChange}
              isChecked={buttonStyle.justifyContent}
            />
            <Radio
              title="Справа"
              value="flex-end"
              name="buttonAlignment"
              onChange={handleInputChange}
              isChecked={buttonStyle.justifyContent}
            />
          </div>
        </div>
        <ColorSelect colorsInfo={buttonColorsInfo} onChange={handleInputChange} />
      </FormSection>
    </div>
  );
};

export default StylesPanel;