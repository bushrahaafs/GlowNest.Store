import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const OrderConfirmationPage: React.FC = () => {
  const { t } = useTranslation();
  const { orderId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [navigate, user]);

  return (
    <div className="container text-center my-5" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}> 
      <div className="p-5 shadow rounded bg-white mx-auto" style={{ maxWidth: 600 }}>
        <div className="mb-4">
          <h2 className="fw-bold text-success">{t('order.success')}</h2>
          <p className="fs-5">
            <span>{t('order.number')}</span>
            <span className="ms-2 fw-bold">{orderId}</span>
          </p>
        </div>
        <button className="btn btn-dark px-4" onClick={() => navigate('/home')}>
          {t('order.backHome')}
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;






