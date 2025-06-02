import React, { ReactNode, useState, MouseEventHandler } from 'react';
import styles from './FormSection.module.css';

interface FormSectionProps {
  title?: string;
  children: ReactNode;
  rowsCount?: number;
}

function FormSection({ title, children, rowsCount = 2 }: FormSectionProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleTitleClick: MouseEventHandler<HTMLHeadingElement> = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {title && (
        <h2 className={styles.formSection__title} onClick={handleTitleClick}>
          {title}
        </h2>
      )}
      <section
        className={`${styles.formSection__section} ${!isVisible ? styles.formSection__section_hidden : ""}`}
        style={{ gridTemplateRows: `repeat(${rowsCount}, 1fr)` }}
      >
        {children}
      </section>
    </>
  );
}

export default FormSection;