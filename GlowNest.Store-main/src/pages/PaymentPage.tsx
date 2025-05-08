import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth, db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

interface CartItem {
  id: number;
  nameKey: string;
  price: number;
  image: string;
  quantity: number;
}

const PaymentPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryInfo, setDeliveryInfo] = useState<{ name: string; address: string; phone: string } | null>(null);

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = localStorage.getItem('deliveryInfo');
    if (stored) {
      setDeliveryInfo(JSON.parse(stored));
    }

    const fetchCart = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const snapshot = await getDocs(collection(db, 'users', user.uid, 'cart'));
      const items: CartItem[] = snapshot.docs.map(docSnap => ({
        id: Number(docSnap.id),
        ...(docSnap.data() as Omit<CartItem, 'id'>),
      }));
      setCartItems(items);
    };

    fetchCart();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validate = (field: string, value: string) => {
    let message = '';
    if (field === 'cardName') {
      if (!/^[A-Za-zأ-ي ]{3,}$/.test(value)) {
        message = t('validation.cardName');
      }
    }
    if (field === 'cardNumber') {
      if (!/^[0-9]{16}$/.test(value)) {
        message = t('validation.cardNumber');
      }
    }
    if (field === 'expiry') {
      if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value)) {
        message = t('validation.expiry');
      }
    }
    if (field === 'cvv') {
      if (!/^[0-9]{3,4}$/.test(value)) {
        message = t('validation.cvv');
      }
    }
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  const handleChange = (field: string, value: string) => {
    if (field === 'cardName') setCardName(value);
    if (field === 'cardNumber') setCardNumber(value);
    if (field === 'expiry') setExpiry(value);
    if (field === 'cvv') setCvv(value);

    setTouched(prev => ({ ...prev, [field]: true }));
    validate(field, value);
  };

  const handlePayment = async () => {
    const fields = { cardName, cardNumber, expiry, cvv };
    Object.entries(fields).forEach(([field, value]) => {
      validate(field, value);
      setTouched(prev => ({ ...prev, [field]: true }));
    });

    const hasErrors = Object.values(errors).some(error => error !== '');
    const hasEmpty = Object.values(fields).some(value => value.trim() === '');
    if (hasErrors || hasEmpty) return;

    const user = auth.currentUser;
    if (!user || !deliveryInfo) return;

    const order = {
      items: cartItems,
      address: {
        name: deliveryInfo.name,
        line: deliveryInfo.address,
        phone: deliveryInfo.phone,
        city: '',
      },
      card: { cardName, cardNumber, expiry, cvv },
      total,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, 'users', user.uid, 'orders'), order);

    for (const item of cartItems) {
      await deleteDoc(doc(db, 'users', user.uid, 'cart', item.id.toString()));
    }

    localStorage.removeItem('deliveryInfo');
    navigate(`/order-confirmation/${docRef.id}`, { replace: true });

  };
  return (
    <div className="container my-5" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}> // ← تعديل لتطبيق الثيم
      <div className="row g-4">
        <div className="col-md-6">
          <h4 className="mb-3">{t('paymentInfo')}</h4>

          {deliveryInfo && (
            <div className="mb-3">
              <p><strong>{t('delivery.name')}:</strong> {deliveryInfo.name}</p>
              <p><strong>{t('delivery.address')}:</strong> {deliveryInfo.address}</p>
              <p><strong>{t('delivery.phone')}:</strong> {deliveryInfo.phone}</p>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">{t('fullName')}</label>
            <input className="form-control" value={cardName} onChange={(e) => handleChange('cardName', e.target.value)} />
            {touched.cardName && errors.cardName && <small className="text-danger">{errors.cardName}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">{t('cardNumber')}</label>
            <input className="form-control" value={cardNumber} onChange={(e) => handleChange('cardNumber', e.target.value)} />
            {touched.cardNumber && errors.cardNumber && <small className="text-danger">{errors.cardNumber}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">{t('expiryDate')}</label>
            <input className="form-control" value={expiry} onChange={(e) => handleChange('expiry', e.target.value)} />
            {touched.expiry && errors.expiry && <small className="text-danger">{errors.expiry}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">{t('cvv')}</label>
            <input className="form-control" value={cvv} onChange={(e) => handleChange('cvv', e.target.value)} />
            {touched.cvv && errors.cvv && <small className="text-danger">{errors.cvv}</small>}
          </div>

          <button className="btn btn-success w-100" onClick={handlePayment}>
            {t('payNow')}
          </button>
          <button className="btn btn-outline-secondary w-100 mt-2" onClick={() => navigate('/delivery')}>
            {t('back')}
          </button>
        </div>

        <div className="col-md-6">
          <div className="border rounded p-4 shadow-sm">
            <h5 className="mb-3">{t('cart.summary')}</h5>
            <ul className="list-unstyled">
              {cartItems.map(item => (
                <li key={item.id} className="mb-2 d-flex justify-content-between">
                  <span>{t(item.nameKey)}</span>
                  <span>{item.quantity} × {item.price} SAR</span>
                </li>
              ))}
            </ul>
            <hr />
            <h6>{t('cart.total')}: {total} SAR</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;










