import React, { ChangeEvent } from 'react';
import styles from './ColorSelect.module.css';

interface ColorInfo {
  name: string;
  title: string;
  value: string;
  isVisible?: boolean;
}

interface ColorSelectProps {
  colorsInfo: ColorInfo[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function ColorSelect({ colorsInfo, onChange }: ColorSelectProps) {
  return (
    <div className={styles.colorSelect}>
      {colorsInfo.map(element => {
        if (element.isVisible !== false) {
          return (
            <div className={styles.colorSelectItem} key={element.name}>
              <input
                className={styles.colorSelect__input}
                type="color"
                name={element.name}
                onChange={onChange}
                value={element.value}
              />
              <label className={styles.colorSelect__label} htmlFor={element.name}>
                {element.title}
              </label>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default ColorSelect;