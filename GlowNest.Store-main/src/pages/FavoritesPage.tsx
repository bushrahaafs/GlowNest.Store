import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth, db } from '../firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';

interface FavoriteItem {
  id: number;
  nameKey: string;
  price: number;
  image: string;
}

const FavoritesPage: React.FC = () => {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const fetchFavorites = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const snapshot = await getDocs(collection(db, 'users', user.uid, 'favorites'));
    const items: FavoriteItem[] = snapshot.docs.map(doc => ({
      ...(doc.data() as FavoriteItem),
      id: Number(doc.id),
    }));
    setFavorites(items);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const removeFavorite = async (id: number) => {
    const user = auth.currentUser;
    if (!user) return;

    await deleteDoc(doc(db, 'users', user.uid, 'favorites', id.toString()));
    fetchFavorites();
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <h2 className="mb-4 text-center">{t('favorites.title')}</h2>

      {favorites.length === 0 ? (
        <div className="text-center">
  <p>{t('favorites.empty')}</p>
  <Link to="/home" className="btn btn-dark mt-3">{t('favorites.backHome')}</Link>
</div>

      ) : (
        <div className="row">
          {favorites.map(item => (
            <div key={item.id} className="col-6 col-md-3 mb-4">
              <div className="card shadow-sm h-100">
                <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.nameKey}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </Link>
                <div className="card-body text-center">
                  <h5 className="card-title">{t(item.nameKey)}</h5>
                  <p className="card-text fw-bold">{item.price} SAR</p>
                  <button className="btn btn-dark btn-sm" onClick={() => removeFavorite(item.id)}>
                    {t('favorites.remove')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;


