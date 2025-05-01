import React from 'react';
import ProductCard from '../components/ProductCard';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { products } from '../data/products'; // ← تأكدي من المسار الصحيح

const SerumsPage: React.FC = () => {
  const { t } = useTranslation();

  // جلب كل المنتجات من نوع serum
  const serums = products.filter(product => product.category === 'serum');

  return (
    <Container className="mt-5">
      <h3 className="mb-4 text-center">{t('categories.serum')}</h3>
      <Row xs={1} sm={2} md={4} className="g-4"> {/* 4 أعمدة */}
        {serums.slice(0, 8).map(product => ( // فقط أول 8 منتجات
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SerumsPage;


