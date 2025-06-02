import { ChangeEvent } from 'react';

interface RadioProps {
  title: string;
  value: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isChecked: string | undefined;
}

function Radio({ title, value, name, onChange, isChecked }: RadioProps) {
  return (
    <div>
      <input
        className="radio__input"
        type="radio"
        id={value}
        name={name}
        value={value}
        onChange={onChange}
        checked={isChecked === value}
      />
      <label
        className="radio__label"
        htmlFor={value}
      >
        {title}
      </label>
    </div>
  );
}

export default Radio;