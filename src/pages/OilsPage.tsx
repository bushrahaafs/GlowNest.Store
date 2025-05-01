import React from 'react';
import ProductCard from '../components/ProductCard';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { products } from '../data/products'; // ← غير المسار حسب مشروعك

const OilsPage: React.FC = () => {
  const { t } = useTranslation();

  // فقط منتجات الزيت
  const oils = products.filter(product => product.category === 'oil');

  return (
    <Container className="mt-5">
      <h3 className="mb-4 text-center">{t('categories.oil')}</h3>
      <Row xs={1} sm={2} md={4} lg={4} className="g-4">
        {oils.map(product => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default OilsPage;



