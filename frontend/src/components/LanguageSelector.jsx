import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <Globe size={18} color="var(--colorTextSecondary)" />
      <select 
        value={i18n.language} 
        onChange={changeLanguage}
        style={{
          background: 'var(--colorGlass)',
          color: 'var(--colorTextPrimary)',
          border: '1px solid var(--colorBorder)',
          padding: '0.2rem 0.5rem',
          borderRadius: '4px',
          outline: 'none',
          cursor: 'pointer'
        }}
      >
        <option value="en" style={{ color: '#000' }}>English</option>
        <option value="es" style={{ color: '#000' }}>Español</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
