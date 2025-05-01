import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { getCartItems, clearCart } from '../utils/cartUtils';
import { createOrder } from '../services/api';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const PaymentPage: React.FC = () => {
  const navigate  = useNavigate();
  const { t }     = useTranslation();
  const location  = useLocation();
  const current   = location.pathname;

  const user = JSON.parse(
    localStorage.getItem('user') || sessionStorage.getItem('user') || 'null'
  );

  useEffect(() => {
    if (!user) navigate('/login', { replace: true });
  }, [user, navigate]);

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber : '',
    expiryDate : '',
    cvv        : '',
    method     : 'visa',
  });

  const [errors, setErrors] = useState({
    cardNumber : false,
    expiryDate : false,
    cvv        : false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {
      cardNumber : paymentInfo.cardNumber.trim() === '',
      expiryDate : paymentInfo.expiryDate.trim() === '',
      cvv        : paymentInfo.cvv.trim() === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handlePayment = async () => {
    
    if (!validateForm()) {
      toast.error(t('allFieldsRequired') || 'Please fill all required fields');
      return;
    }

   
    if (!/^[0-9]{12,19}$/.test(paymentInfo.cardNumber)) {
      toast.error(t('cardNumber') + ' must be numbers only');
      return;
    }
    if (!/^[0-9]{3,4}$/.test(paymentInfo.cvv)) {
      toast.error(t('cvv') + ' must be 3 or 4 digits');
      return;
    }

    
    const cartItemsRaw = getCartItems();
    const deliveryInfo = JSON.parse(localStorage.getItem('deliveryInfo') || '{}');

    const cartItems = cartItemsRaw.map(item => ({
      productName : item.name,
      quantity    : item.quantity,
      price       : item.price,
    }));

    try {
      const res = await createOrder({
        cartItems,
        deliveryInfo,
        paymentInfo,
        userId: user?.id || null,
      });

      clearCart();
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success(t('paymentSuccess'));
      navigate(`/order-confirmation/${res.orderId}`);
    } catch (err) {
      toast.error(t('paymentFailed'));
      console.error(err);
    }
  };

  return (
    <div className="container my-5">
      {/* Progress Steps */}
      <div className="d-flex justify-content-center align-items-center mb-5">
        <Link to="/cart"     className="text-decoration-none text-center">
          <div className="rounded-circle border border-dark bg-white text-dark fw-bold"
               style={{ width:35,height:35,lineHeight:'32px' }}>1</div>
          <div style={{ fontSize:13,marginTop:4 }}>Cart</div>
        </Link>

        <div className="flex-grow-1 mx-2" style={{ height:2, background:'#ccc' }}></div>

        <Link to="/delivery" className="text-decoration-none text-center">
          <div className={`rounded-circle border ${current.includes('delivery') ? 'bg-dark text-white':'bg-white text-dark'} fw-bold`}
               style={{ width:35,height:35,lineHeight:'32px' }}>2</div>
          <div style={{ fontSize:13,marginTop:4 }}>Delivery</div>
        </Link>

        <div className="flex-grow-1 mx-2" style={{ height:2, background:'#ccc' }}></div>

        <Link to="/payment"  className="text-decoration-none text-center">
          <div className={`rounded-circle border ${current.includes('payment') ? 'bg-dark text-white':'bg-white text-dark'} fw-bold`}
               style={{ width:35,height:35,lineHeight:'32px' }}>3</div>
          <div style={{ fontSize:13,marginTop:4 }}>Payment</div>
        </Link>
      </div>

      {/* Card */}
      <div className="shadow rounded p-4 mx-auto bg-white" style={{ maxWidth:600 }}>
        <h3 className="mb-4 text-center">{t('paymentInfo')}</h3>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="form-label d-block mb-2">{t('paymentMethod')}:</label>
          <div className="d-flex justify-content-start gap-4">
            {['visa','mastercard','paypal'].map(method => (
              <label key={method} className="d-flex align-items-center gap-1">
                <input type="radio" name="method" value={method}
                       checked={paymentInfo.method === method}
                       onChange={handleChange}/>
                {method.charAt(0).toUpperCase() + method.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Card Number */}
        <div className="mb-3">
          <label className="form-label">{t('cardNumber')}</label>
          <input type="text" name="cardNumber"
                 inputMode="numeric" pattern="[0-9]*"
                 className={`form-control ${errors.cardNumber ? 'is-invalid':''}`}
                 value={paymentInfo.cardNumber}
                 onChange={handleChange}/>
        </div>

        {/* Expiry & CVV */}
        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label">{t('expiryDate')}</label>
            <input type="text" name="expiryDate"
                   placeholder="MM/YY"
                   className={`form-control ${errors.expiryDate ? 'is-invalid':''}`}
                   value={paymentInfo.expiryDate}
                   onChange={handleChange}/>
          </div>
          <div className="col-md-6">
            <label className="form-label">{t('cvv')}</label>
            <input type="text" name="cvv"
                   inputMode="numeric" pattern="[0-9]*"
                   className={`form-control ${errors.cvv ? 'is-invalid':''}`}
                   value={paymentInfo.cvv}
                   onChange={handleChange}/>
          </div>
        </div>

        <button className="btn btn-dark w-100" onClick={handlePayment}>
          {t('payNow')}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;









