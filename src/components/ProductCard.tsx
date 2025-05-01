import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { addToCart } from '../utils/cartUtils';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface ProductType {
  id: number;
  nameKey: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<{ product: ProductType }> = ({ product }) => {
  const { t } = useTranslation();
  const [liked, setLiked] = useState(false);

  // ✅ تحميل حالة الإعجاب من التخزين المحلي
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const exists = favorites.some((f: ProductType) => f.id === product.id);
    setLiked(!!exists);
  }, [product.id]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: t(product.nameKey),
      price: product.price,
      image: product.image,
      quantity: 1
    });
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success(t('addedToCart'));
  };

  const handleLike = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const exists = favorites.find((f: ProductType) => f.id === product.id);

    let updatedFavorites;
    if (exists) {
      updatedFavorites = favorites.filter((f: ProductType) => f.id !== product.id);
      toast.info(t('removedFromFavorites'));
      setLiked(false);
    } else {
      updatedFavorites = [...favorites, product];
      toast.success(t('addedToFavorites'));
      setLiked(true);
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="card h-100 shadow-sm position-relative">
      <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
        <img
          src={product.image}
          alt={t(product.nameKey)}
          className="card-img-top img-fluid rounded"
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body text-center">
          <h6 className="fw-bold">{t(product.nameKey)}</h6>
          <p className="text-muted">{product.price} SAR</p>
        </div>
      </Link>

      <div className="d-flex justify-content-center gap-3 mb-3">
        <button
          onClick={handleAddToCart}
          className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
          style={{ borderRadius: '50%', width: '40px', height: '40px' }}
        >
          <FaShoppingCart size={18} />
        </button>
        <button
          onClick={handleLike}
          className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
          style={{ borderRadius: '50%', width: '40px', height: '40px' }}
        >
          <FaHeart size={18} color={liked ? 'black' : 'gray'} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

















