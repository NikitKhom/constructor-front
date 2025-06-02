import React, { useRef, useState } from 'react';
import styles from './CodeBlock.module.css';

interface CodeBlockProps {
  onCopy: () => void;
  width?: number;
  title: string;
  code: string;
  language: 'html' | 'css' | 'javascript' | 'typescript';
}

const CodeBlock: React.FC<CodeBlockProps> = ({ onCopy, width, title, code, language }) => {
  const codeRef = useRef<HTMLElement>(null);
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  const handleCopyToClipboard = async () => {
    if (codeRef.current) {
      try {
        await navigator.clipboard.writeText(code);
        setShowCopyMessage(true);
        onCopy();
        setTimeout(() => setShowCopyMessage(false), 2000);
      } catch (err) {
        console.error('Не удалось скопировать текст: ', err);
        alert('Ошибка при копировании кода.');
      }
    }
  };

  return (
    <div className={styles.codeBlockContainer} style={width ? { width: `${width}px` } : {}}>
      <div className={styles.codeBlockHeader}>
        <span className={styles.codeBlockTitle}>{title}</span>
        <button
          onClick={handleCopyToClipboard}
          className={`${styles.copyButton} ${showCopyMessage ? styles.copied : ''}`}
        >
          {showCopyMessage ? 'Скопировано!' : 'Скопировать'}
        </button>
      </div>
      <pre className={styles.codeContent}>
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;