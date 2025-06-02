import { ChangeEvent } from 'react';
import styles from './Controller.module.css';

interface ControllerProps {
  title: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  range: { min: number; max: number };
  value: number;
}

function Controller({ title, name, onChange, range, value }: ControllerProps) {
  return (
    <>
      <label className={styles.controller__label} htmlFor={name} >
        {`${title}:`} <span className={styles.controller__value} >{value}px</span>
      </label>
      <input
        className={styles.controller__range}
        id={name}
        type="range"
        name={name}
        onChange={onChange}
        value={value}
        max={range.max}
        min={range.min}
      />
    </>
  );
}

export default Controller;