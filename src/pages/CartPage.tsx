import React, { useEffect, useState } from 'react';
import {
  getCartItems,
  removeFromCart,
  updateCartItemQuantity
} from '../utils/cartUtils';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaHeart, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface CartItem {
  id: number;
  name: string;        // المفتاح مثل products.naturalSoap
  price: number;
  image: string;
  quantity: number;
}

interface ProductType {
  id: number;
  nameKey: string;
  price: number;
  image: string;
}

const CartPage: React.FC = () => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState<CartItem[]>(getCartItems());
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const navigate = useNavigate();

  /* تحديث السلة والمفضلة */
  useEffect(() => {
    const updateCart = () => setCartItems(getCartItems());
    updateCart();

    const favorites: ProductType[] = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    setLikedItems(favorites.map((f) => f.id));

    window.addEventListener('cartUpdated', updateCart);
    return () => window.removeEventListener('cartUpdated', updateCart);
  }, []);

  /* إزالة من السلة */
  const handleRemove = (id: number) => {
    removeFromCart(id);
    window.dispatchEvent(new Event('cartUpdated'));
    toast.warn(t('removedFromCart'));
  };

  /* نقل إلى المفضلة */
  const handleMoveToFavorites = (product: CartItem) => {
    const favorites: ProductType[] = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    const exists = favorites.some((p) => p.id === product.id);

    const newFav: ProductType = {
      id: product.id,
      nameKey: product.name,
      price: product.price,
      image: product.image
    };

    if (!exists) {
      const updated = [...favorites, newFav];
      localStorage.setItem('favorites', JSON.stringify(updated));
      setLikedItems((prev) => [...prev, product.id]);
      toast.success(t('addedToFavorites'));
    } else {
      toast.info(t('alreadyInFavorites'));
    }
  };

  /* تغيير الكمية */
  const handleQuantityChange = (id: number, qty: number) => {
    if (qty < 1) return;
    updateCartItemQuantity(id, qty);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">{t('cart.title')}</h2>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>{t('cart.empty')}</p>
          <Link to="/home" className="btn btn-primary">
            {t('cart.continueShopping')}
          </Link>
        </div>
      ) : (
        <div className="row">
          {/* قائمة العناصر */}
          <div className="col-md-8">
            {cartItems.map((item) => (
              <div key={item.id} className="card mb-3 shadow-sm">
                <div className="row g-0 align-items-center">
                  <div className="col-4 col-sm-3">
                    <img
                      src={item.image}
                      alt={t(item.name)}
                      className="img-fluid rounded-start"
                    />
                  </div>
                  <div className="col-8 col-sm-6">
                    <div className="card-body">
                      <h6 className="card-title mb-1 fw-bold">
                        {t(item.name)}
                      </h6>
                      <p className="mb-1 text-muted small">
                        {t('price')}: {item.price} SAR
                      </p>
                      <div className="d-flex align-items-center gap-2">
                        <span>{t('cart.quantity')}:</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                        >
                          <FaMinus />
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* أزرار مفضلة / حذف */}
                  <div className="col-sm-3 text-end pe-3 pb-3 d-flex flex-column align-items-end gap-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleMoveToFavorites(item)}
                    >
                      <FaHeart
                        color={likedItems.includes(item.id) ? 'black' : 'gray'}
                      />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemove(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ملخص الطلب */}
          <div className="col-md-4">
            <div
              className="card p-4 shadow-sm sticky-top"
              style={{ top: '90px' }}
            >
              <h5 className="mb-3">{t('cart.summary')}</h5>
              <p className="fs-5">
                {t('cart.total')}: <strong>{total} SAR</strong>
              </p>
              <button
                className="btn btn-dark w-100 mt-3"
                onClick={() => navigate('/delivery')}
              >
                {t('cart.checkout')}
              </button>
              <Link
                to="/home"
                className="btn btn-outline-secondary w-100 mt-2"
              >
                {t('cart.continueShopping')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;








