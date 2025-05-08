import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { auth, db } from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

interface Order {
  id: string;
  items: {
    id: number;
    nameKey: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  createdAt: string;
}

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [userInfo, setUserInfo] = useState<{ name?: string; email?: string }>({});

  const fetchOrders = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      setUserInfo(userDoc.data());
    }

    const snapshot = await getDocs(collection(db, 'users', user.uid, 'orders'));
    const orderList: Order[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Order, 'id'>)
    }));
    setOrders(orderList);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container my-5" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}> // ← تعديل لتطبيق الثيم
      <h2 className="mb-4 text-center">{t('profilePage.title')}</h2>

      <div className="card p-4 mb-5 shadow-sm">
        <h5>{t('profilePage.name')}: {userInfo.name || '-'}</h5>
        <h6>{t('profilePage.email')}: {userInfo.email || '-'}</h6>
      </div>

      <h4 className="mb-4">{t('profilePage.orders')}</h4>

      {orders.length === 0 ? (
        <p className="text-center">{t('profilePage.noOrders')}</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">
                {t('profilePage.order')} #{order.id}
              </h5>
              <p className="card-subtitle mb-2 text-muted">{t('profilePage.date')}: {new Date(order.createdAt).toLocaleDateString()}</p>
              <div className="table-responsive mt-3">
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th>{t('cart.product')}</th>
                      <th>{t('cart.quantity')}</th>
                      <th>{t('cart.price')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <img src={item.image} alt={item.nameKey} width="60" height="60" />
                            <span>{t(item.nameKey)}</span>
                          </div>
                        </td>
                        <td>{item.quantity}</td>
                        <td>{item.price * item.quantity} SAR</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h5 className="text-end">{t('cart.total')}: {order.total} SAR</h5>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;













