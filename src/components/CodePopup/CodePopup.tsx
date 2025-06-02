import React from 'react';
import Popup from '../Popup/Popup';
import CodeBlock from '../CodeBlock/CodeBlock';
import styles from './CodePopup.module.css';

interface CodePopupProps {
  isOpen: boolean;
  onClose: () => void;
  htmlCode: string;
  cssCode: string;
}

const CodePopup: React.FC<CodePopupProps> = ({ isOpen, onClose, htmlCode, cssCode }) => {
  const handleCopySuccess = () => {
    console.log('Код успешно скопирован!');
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.popupTitle}>Вёрстка готова!</h2>
      <div className={styles.codeBlocksWrapper}>
        <CodeBlock
          onCopy={handleCopySuccess}
          title='HTML'
          code={htmlCode}
          language='html'
        />
        <CodeBlock
          onCopy={handleCopySuccess}
          title='CSS'
          code={cssCode}
          language='css'
        />
      </div>
    </Popup>
  );
};

export default CodePopup;