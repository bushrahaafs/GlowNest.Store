import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface Product {
  id: number;
  nameKey: string;
  descriptionKey: string;
  price: number;
  category: string;
  image: string;
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [product, setProduct] = useState<Product | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const docSnap = await getDoc(doc(db, 'products', id));
      if (docSnap.exists()) {
        const productData = { ...(docSnap.data() as Product), id: Number(id) };
        setProduct(productData);
        checkIfFavorite(productData.id);
      }
    };
    fetchProduct();
  }, [id]);

  const checkIfFavorite = async (productId: number) => {
    const user = auth.currentUser;
    if (!user) return;
    const favRef = doc(db, 'users', user.uid, 'favorites', productId.toString());
    const favDoc = await getDoc(favRef);
    setIsFavorite(favDoc.exists());
  };

  const handleAddToCart = async () => {
    const user = auth.currentUser;
    if (!user || !product) return;

    const ref = doc(db, 'users', user.uid, 'cart', product.id.toString());
    await setDoc(ref, {
      id: product.id,
      nameKey: product.nameKey,
      image: product.image,
      price: product.price,
      quantity: quantity
    });
    toast.success(t('addedToCart'));
  };

  const handleToggleFavorite = async () => {
    const user = auth.currentUser;
    if (!user || !product) return;

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
        image: product.image,
        price: product.price
      });
      setIsFavorite(true);
      toast.success(t('addedToFavorites'));
    }
  };

  if (!product) return <p className="text-center mt-5">{t('loading')}</p>;

  return (
    <div className="container my-5" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}> 
      <div className="row align-items-center">
        <div className="col-md-6">
          <img src={product.image} alt={t(product.nameKey)} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{t(product.nameKey)}</h2>
          <p>{t(product.descriptionKey)}</p>
          <h4>{product.price} SAR</h4>

          <div className="d-flex align-items-center mt-3 mb-4">
            <button className="btn btn-outline-secondary me-2" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
            <span className="px-3">{quantity}</span>
            <button className="btn btn-outline-secondary ms-2" onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>

          <div className="d-flex gap-3">
            <button className="btn btn-dark" onClick={handleAddToCart}>
              <FaShoppingCart /> {t('favorites.addToCart')}
            </button>
            <button
              className={`btn btn-sm ${isFavorite ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={handleToggleFavorite}
            >
              <FaHeart /> {t('favorites.add')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;


















