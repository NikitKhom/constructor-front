import React from 'react';

export const toKebabCaseCssString = (styleObject: React.CSSProperties): string => {
  let cssString = '';
  for (const key of Object.keys(styleObject) as Array<keyof React.CSSProperties>) {
    const value = styleObject[key];
    const cssProperty = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    if (value !== undefined && value !== null && value !== '') {
      cssString += `${cssProperty}: ${value};\n`;
    }
  }
  return cssString.trim();
};

export const fromKebabCaseCssString = (cssString: string): React.CSSProperties => {
  const styleObject: React.CSSProperties = {};
  cssString.split(';').forEach(rule => {
    const parts = rule.split(':').map(p => p.trim());
    if (parts.length === 2) {
      const cssPropertyKebab = parts[0];
      const cssValue = parts[1];
      const cssPropertyCamel = cssPropertyKebab.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      (styleObject as any)[cssPropertyCamel] = cssValue;
    }
  });
  return styleObject;
};