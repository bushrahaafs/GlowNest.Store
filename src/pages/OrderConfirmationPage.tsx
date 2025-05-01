import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [navigate, user]);

  return (
    <div className="container text-center my-5">
      <div className="p-5 shadow rounded bg-white mx-auto" style={{ maxWidth: 600 }}>
        <div className="mb-4">
          <h2 className="fw-bold text-success">🎉 تم إرسال طلبك بنجاح</h2>
          <p className="fs-5">رقم الطلب: <strong>{orderId}</strong></p>
        </div>
        <button className="btn btn-dark px-4" onClick={() => navigate('/home')}>
          العودة للصفحة الرئيسية
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;




