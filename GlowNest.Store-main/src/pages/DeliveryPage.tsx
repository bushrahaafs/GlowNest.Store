import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth, db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface CartItem {
  id: number;
  nameKey: string;
  price: number;
  image: string;
  quantity: number;
}

const DeliveryPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
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
    if (field === 'name') {
      if (!/^[A-Za-zأ-ي\s]{3,}$/.test(value)) {
        message = t('validation.name');
      }
    }
    if (field === 'address') {
      if (!value.trim()) {
        message = t('validation.address');
      }
    }
    if (field === 'phone') {
      if (!/^[0-9]{9,15}$/.test(value)) {
        message = t('validation.phone');
      }
    }
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  const handleChange = (field: string, value: string) => {
    if (field === 'name') setName(value);
    if (field === 'address') setAddress(value);
    if (field === 'phone') setPhone(value);

    setTouched(prev => ({ ...prev, [field]: true }));
    validate(field, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fields = { name, address, phone };
    Object.entries(fields).forEach(([field, value]) => {
      validate(field, value);
      setTouched(prev => ({ ...prev, [field]: true }));
    });

    const hasErrors = Object.values(errors).some(error => error !== '');
    const hasEmpty = Object.values(fields).some(value => value.trim() === '');
    if (hasErrors || hasEmpty) return;

    localStorage.setItem('deliveryInfo', JSON.stringify({ name, address, phone }));
    navigate('/payment');
  };

  return (
    <div className="container my-5" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <div className="row g-4">
        <div className="col-md-6">
          <h4 className="mb-3">{t('deliveryInfo')}</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">{t('delivery.name')}</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              {touched.name && errors.name && <small className="text-danger">{errors.name}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label">{t('delivery.address')}</label>
              <textarea
                className="form-control"
                rows={3}
                value={address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
              {touched.address && errors.address && <small className="text-danger">{errors.address}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label">{t('delivery.phone')}</label>
              <input
                type="tel"
                className="form-control"
                value={phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
              {touched.phone && errors.phone && <small className="text-danger">{errors.phone}</small>}
            </div>

            <button type="submit" className="btn btn-dark w-100 mb-2">
              {t('next')}
            </button>
            <button type="button" className="btn btn-outline-secondary w-100" onClick={() => navigate('/cart')}>
              {t('back')}
            </button>
          </form>
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

export default DeliveryPage;











