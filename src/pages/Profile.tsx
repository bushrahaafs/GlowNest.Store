import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Order {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  orderDate: string;
}

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const user = JSON.parse(
    localStorage.getItem('user') || sessionStorage.getItem('user') || 'null'
  );
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return;
      try {
        const response = await fetch(
          `https://localhost:7237/api/orders/user/${user.id}`
        );
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error(t('profilePage.loadFailed'), err);
      }
    };
    fetchOrders();
  }, [user, t]);

  return (
    <div className="container mt-5">
      <h2>
        {t('profilePage.greeting')} {user?.name}
      </h2>
      <p className="text-muted">{user?.email}</p>

      <h4 className="mt-4 mb-3">{t('profilePage.myOrders')}</h4>

      {orders.length === 0 ? (
        <p>{t('profilePage.noOrders')}</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border rounded p-3 mb-3">
            <strong>{order.productName}</strong> × {order.quantity} —{' '}
            {order.price} SAR
            <br />
            <small className="text-muted">
              {new Date(order.orderDate).toLocaleDateString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;












