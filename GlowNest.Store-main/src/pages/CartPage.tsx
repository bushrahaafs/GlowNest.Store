import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  setDoc
} from 'firebase/firestore';

interface CartItem {
  id: number;
  nameKey: string;
  price: number;
  image: string;
  quantity: number;
}

const CartPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const snapshot = await getDocs(collection(db, 'users', user.uid, 'cart'));
    const items: CartItem[] = snapshot.docs.map(doc => ({
      ...(doc.data() as CartItem),
      id: Number(doc.id),
    }));
    setCartItems(items);
    setLoading(false);
  };

  const fetchFavorites = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const favSnap = await getDocs(collection(db, 'users', user.uid, 'favorites'));
    const favIds = favSnap.docs.map(doc => Number(doc.id));
    setFavoriteIds(favIds);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchCart();
        fetchFavorites();
      } else {
        setCartItems([]);
        setFavoriteIds([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const updateQuantity = async (id: number, amount: number) => {
    const user = auth.currentUser;
    if (!user) return;

    const itemRef = doc(db, 'users', user.uid, 'cart', id.toString());
    const current = cartItems.find((item) => item.id === id);
    if (!current) return;

    const newQuantity = current.quantity + amount;
    if (newQuantity <= 0) return;

    await updateDoc(itemRef, { quantity: newQuantity });
    fetchCart();
  };

  const removeItem = async (id: number) => {
    const user = auth.currentUser;
    if (!user) return;

    await deleteDoc(doc(db, 'users', user.uid, 'cart', id.toString()));
    fetchCart();
  };

  const addToFavorites = async (item: CartItem) => {
    const user = auth.currentUser;
    if (!user) return;

    const favRef = doc(db, 'users', user.uid, 'favorites', item.id.toString());
    await setDoc(favRef, item);
    fetchFavorites();
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className="container text-center my-5">
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container text-center my-5" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
        <h2>{t('cart.title')}</h2>
        <p>{t('cart.empty')}</p>
        <Link to="/home" className="btn btn-dark mt-3">{t('cart.shopNow')}</Link>
      </div>
    );
  }
  

  return (
    <div className="container my-5" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <h2 className="mb-4 text-center">{t('cart.title')}</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="table-responsive shadow rounded">
            <table className="table align-middle text-center mb-0">
              <thead className="table-light">
                <tr>
                  <th>{t('cart.product')}</th>
                  <th>{t('cart.quantity')}</th>
                  <th>{t('cart.price')}</th>
                  <th>{t('cart.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div
                        className="d-flex align-items-center gap-3"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        <img
                          src={item.image}
                          alt={item.nameKey}
                          width="60"
                          height="60"
                          style={{ objectFit: 'cover' }}
                        />
                        <span>{t(item.nameKey) || item.nameKey}</span>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <button className="btn btn-sm btn-outline-dark" onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button className="btn btn-sm btn-outline-dark" onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                    </td>
                    <td>{item.price * item.quantity} SAR</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-sm btn-danger" onClick={() => removeItem(item.id)}>
                          {t('cart.remove')}
                        </button>
                        <button
                          className={`btn btn-sm ${favoriteIds.includes(item.id) ? 'btn-dark' : 'btn-outline-secondary'}`}
                          onClick={() => addToFavorites(item)}
                        >
                          ♥
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-4 mt-4 mt-md-0">
          <div className="border p-4 rounded shadow sticky-top" style={{ top: 100 }}>
            <h4 className="mb-3">{t('cart.summary')}</h4>
            <p className="mb-2">{t('cart.total')}: <strong>{totalPrice} SAR</strong></p>
            <button className="btn btn-dark w-100" onClick={() => navigate('/delivery')}>
              {t('cart.proceed')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;













