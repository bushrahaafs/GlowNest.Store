import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getProductsByCategory, Product } from '../services/productsService';
import ProductCard from '../components/ProductCard';

const OilsPage: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const items = await getProductsByCategory('oil');
      setProducts(items);
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-5" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <h2 className="mb-4 text-center">{t('categories.oil')}</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-6 col-md-3 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OilsPage;



