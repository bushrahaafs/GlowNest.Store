import React from 'react';
import { useTranslation } from 'react-i18next';

const DiscountBanner: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div style={{
      backgroundColor: '#739072',
      textAlign: 'center',
      padding: '10px 0',
      fontSize: '14px',
      fontWeight: 500,
      color: '#fff'
    }}>
      {t('discountBanner.title')} 
     
    </div>
  );
};

export default DiscountBanner;
