import React from 'react';
import ProductCard from '../components/ProductCard';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { products } from '../data/products';

const SoapsPage: React.FC = () => {
  const { t } = useTranslation();
  const soaps = products.filter(product => product.category === 'soap');

  return (
    <Container className="mt-5">
      <h3 className="mb-4 text-center">{t('categories.soap')}</h3>
      <Row xs={1} sm={2} md={4} lg={4} className="g-4">
        {soaps.map(product => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SoapsPage;





