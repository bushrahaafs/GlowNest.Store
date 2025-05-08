import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

interface Product {
  id: number;
  nameKey: string;
  price: number;
  image: string;
}

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (user) {
        const favRef = doc(db, 'users', user.uid, 'favorites', product.id.toString());
        const favDoc = await getDoc(favRef);
        setIsFavorite(favDoc.exists());
      }
    };
    checkFavorite();
  }, [user, product.id]);

  const toggleFavorite = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const favRef = doc(db, 'users', user.uid, 'favorites', product.id.toString());
    const favDoc = await getDoc(favRef);

    if (favDoc.exists()) {
      await deleteDoc(favRef);
      setIsFavorite(false);
      toast.warn(t('removedFromFavorites'));
    } else {
      await setDoc(favRef, {
        id: product.id,
        nameKey: product.nameKey,
        price: product.price,
        image: product.image
      });
      setIsFavorite(true);
      toast.success(t('addedToFavorites'));
    }
  };

  const addToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await setDoc(doc(db, 'users', user.uid, 'cart', product.id.toString()), {
        id: product.id,
        nameKey: product.nameKey,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
      toast.success(t('addedToCart'));
    } catch (err) {
      console.error('Add to cart error', err);
      toast.error(t('favorites.error'));
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      <div onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
        <img
          src={product.image}
          alt={t(product.nameKey)}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body text-center">
          <h6 className="card-title">{t(product.nameKey)}</h6>
          <p className="card-text fw-bold">{product.price} SAR</p>
        </div>
      </div>

      <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center px-3">
        <button className={`btn btn-sm ${isFavorite ? 'btn-dark' : 'btn-outline-dark'}`} onClick={toggleFavorite}>
          <FaHeart />
        </button>

        <div className="d-flex align-items-center">
          <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
          <span>{quantity}</span>
          <button className="btn btn-sm btn-outline-secondary ms-1" onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>

        <button className="btn btn-sm btn-outline-dark" onClick={addToCart}>
          <FaShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;




















