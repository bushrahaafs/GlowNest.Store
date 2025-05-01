import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { addToCart } from '../utils/cartUtils';
import { toast } from 'react-toastify';

interface ProductType {
  id: number;
  nameKey: string;
  descriptionKey?: string;
  price: number;
  image: string;
  category: string;
}

const ProductDetailsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id)) as ProductType | undefined;

  const [liked, setLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const favs: ProductType[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    setLiked(favs.some((p) => p.id === product?.id));
  }, [product?.id]);

  if (!product) {
    return (
      <div className="container my-5 text-center">
        {t('product.notFound')}
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.nameKey,
      price: product.price,
      image: product.image,
      quantity
    });
    window.dispatchEvent(new Event('cartUpdated'));
    navigate('/cart');
  };

  const handleLike = () => {
    const favorites: ProductType[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const exists = favorites.some((p) => p.id === product.id);
    const updated = exists ? favorites.filter(p => p.id !== product.id) : [...favorites, product];
    localStorage.setItem('favorites', JSON.stringify(updated));
    setLiked(!exists);
    toast[exists ? 'info' : 'success'](
      t(exists ? 'removedFromFavorites' : 'addedToFavorites')
    );
  };

  /* ✅ كلاس RTL إن كانت اللغة عربية */
  const rtl = i18n.language === 'ar' ? 'rtl text-end' : '';

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0">
        <div className="row g-0">
          <div className="col-md-6 text-center p-4">
            <img
              src={product.image}
              alt={t(product.nameKey)}
              className="img-fluid rounded"
              style={{ maxHeight: 450, objectFit: 'cover' }}
            />
          </div>

          {/* تفاصيل المنتج مع RTL عند العربية */}
          <div className={`col-md-6 p-4 d-flex flex-column ${rtl}`}>
            <h2 className="fw-bold mb-2">{t(product.nameKey)}</h2>
            <h5 className="text-muted mb-3">
              {t('price')}: <span className="text-dark">{product.price} SAR</span>
            </h5>
            <p className="mb-1">
              <strong>{t('category')}:</strong> {t(`categories.${product.category}`)}
            </p>
            <p>
              <strong>{t('description')}:</strong>{' '}
              {product.descriptionKey ? t(product.descriptionKey) : t('noDescription')}
            </p>

            <div className="mt-auto">
              <div className="d-flex align-items-center gap-3 mb-3">
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="form-control"
                  style={{ width: 90 }}
                />
                <button
                  onClick={handleAddToCart}
                  className="btn btn-dark d-flex align-items-center gap-2"
                >
                  <FaShoppingCart /> {t('cart.checkout')}
                </button>
                <button onClick={handleLike} className="btn btn-outline-secondary">
                  <FaHeart style={{ color: liked ? '#000' : 'gray' }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;















