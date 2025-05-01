import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const DeliveryPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  const [deliveryInfo, setDeliveryInfo] = useState<Record<string, string>>({
    name: '',
    address: '',
    city: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({
    name: false,
    address: false,
    city: false,
    phone: false,
  });

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {
      name: deliveryInfo.name.trim() === '',
      address: deliveryInfo.address.trim() === '',
      city: deliveryInfo.city.trim() === '',
      phone: deliveryInfo.phone.trim() === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!validateForm()) {
      toast.error(t('allFieldsRequired') || 'Please fill all required fields');
      return;
    }

    if (!/^[0-9]+$/.test(deliveryInfo.phone)) {
      toast.error(t('phone') + ' must be numbers only');
      return;
    }

    localStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));
    navigate('/payment');
  };

  const current = location.pathname;

  return (
    <div className="container my-5">
      {/* Progress Steps */}
      <div className="d-flex justify-content-center align-items-center mb-5">
        <Link to="/cart" className="text-decoration-none text-center">
          <div className="rounded-circle border border-dark bg-white text-dark fw-bold" style={{ width: 35, height: 35, lineHeight: '32px' }}>1</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Cart</div>
        </Link>
        <div className="flex-grow-1 mx-2" style={{ height: 2, background: '#ccc' }}></div>
        <Link to="/delivery" className="text-decoration-none text-center">
          <div className={`rounded-circle border ${current.includes('delivery') ? 'bg-dark text-white' : 'bg-white text-dark'} fw-bold`} style={{ width: 35, height: 35, lineHeight: '32px' }}>2</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Delivery</div>
        </Link>
        <div className="flex-grow-1 mx-2" style={{ height: 2, background: '#ccc' }}></div>
        <Link to="/payment" className="text-decoration-none text-center">
          <div className={`rounded-circle border ${current.includes('payment') ? 'bg-dark text-white' : 'bg-white text-dark'} fw-bold`} style={{ width: 35, height: 35, lineHeight: '32px' }}>3</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Payment</div>
        </Link>
      </div>

      <div className="shadow rounded p-4 mx-auto bg-white" style={{ maxWidth: 600 }}>
        <h3 className="mb-4 text-center">{t('deliveryInfo')}</h3>

        <div className="mb-3">
          <label className="form-label">{t('name')}</label>
          <input
            type="text"
            name="name"
            pattern="[A-Za-zأ-ي\\s]+"
            value={deliveryInfo.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          {errors.name && <div className="text-danger small mt-1">{t('nameRequired')}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">{t('address')}</label>
          <input
            type="text"
            name="address"
            value={deliveryInfo.address}
            onChange={handleChange}
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
          />
          {errors.address && <div className="text-danger small mt-1">{t('addressRequired')}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">{t('city')}</label>
          <input
            type="text"
            name="city"
            pattern="[A-Za-zأ-ي\\s]+"
            value={deliveryInfo.city}
            onChange={handleChange}
            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
          />
          {errors.city && <div className="text-danger small mt-1">{t('cityRequired')}</div>}
        </div>

        <div className="mb-4">
          <label className="form-label">{t('phone')}</label>
          <input
            type="tel"
            name="phone"
            inputMode="numeric"
            pattern="[0-9]*"
            value={deliveryInfo.phone}
            onChange={handleChange}
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
          />
          {errors.phone && <div className="text-danger small mt-1">{t('phoneRequired')}</div>}
        </div>

        <button className="btn btn-dark w-100" onClick={handleNext}>
          {t('next')}
        </button>
      </div>
    </div>
  );
};

export default DeliveryPage;





