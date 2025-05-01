import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>

      {/* بانر رئيسي */}
      <section className="position-relative">
        <img src="/assets/banner.jpg" alt="Banner" className="img-fluid w-100" style={{ height: '80vh', objectFit: 'cover' }} />
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
          <h1 className="fw-bold display-4">{t('homePage.heroTitle')}</h1>
          <p className="lead">{t('homePage.heroSubtitle')}</p>
          <Link to="/soaps" className="btn btn-light mt-3">{t('homePage.shopNow')}</Link>
        </div>
      </section>

      {/* مكونات المنتج */}
      <section className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img src="/assets/ingredients.jpg" alt="Ingredients" className="img-fluid rounded" />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">{t('homePage.ingredientsTitle')}</h2>
            <p>{t('homePage.ingredientsText1')}</p>
            <p>{t('homePage.ingredientsText2')}</p>
          </div>
        </div>
      </section>

      {/* فوائد المنتج */}
      <section className="container my-5">
        <h2 className="fw-bold text-center mb-5">{t('homePage.benefitsTitle')}</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <img src="/assets/nourishing.jpg" alt="Nourishing" className="img-fluid rounded mb-3" />
            <h5>{t('homePage.benefit1Title')}</h5>
            <p>{t('homePage.benefit1Text')}</p>
          </div>
          <div className="col-md-4 mb-4">
            <img src="/assets/hydration.jpg" alt="Hydration" className="img-fluid rounded mb-3" />
            <h5>{t('homePage.benefit2Title')}</h5>
            <p>{t('homePage.benefit2Text')}</p>
          </div>
          <div className="col-md-4 mb-4">
            <img src="/assets/non-greasy.jpg" alt="Non Greasy" className="img-fluid rounded mb-3" />
            <h5>{t('homePage.benefit3Title')}</h5>
            <p>{t('homePage.benefit3Text')}</p>
          </div>
        </div>
      </section>

      {/* مراجعات العملاء */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-5">{t('homePage.reviewsTitle')}</h2>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <div className="card p-3 shadow-sm">
                <p>{t('homePage.review1')}</p>
                <div className="text-warning">★★★★☆</div>
                <small>- Sarah A.</small>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card p-3 shadow-sm">
                <p>{t('homePage.review2')}</p>
                <div className="text-warning">★★★★★</div>
                <small>- Emily R.</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* التصنيفات */}
      <section className="container my-5">
        <h2 className="fw-bold text-center mb-5">{t('homePage.categoriesTitle')}</h2>
        <div className="row text-center">
          <div className="col-6 col-md-3 mb-4">
            <Link to="/soaps" className="text-decoration-none text-dark">
              <img src="/assets/natural.jpg" alt="Soap" className="img-fluid rounded mb-2" />
              <h6>{t('categories.soap')}</h6>
            </Link>
          </div>
          <div className="col-6 col-md-3 mb-4">
            <Link to="/serums" className="text-decoration-none text-dark">
              <img src="/assets/serum.jpg" alt="Serum" className="img-fluid rounded mb-2" />
              <h6>{t('categories.serum')}</h6>
            </Link>
          </div>
          <div className="col-6 col-md-3 mb-4">
            <Link to="/oils" className="text-decoration-none text-dark">
              <img src="/assets/oils.jpg" alt="Oils" className="img-fluid rounded mb-2" />
              <h6>{t('categories.oil')}</h6>
            </Link>
          </div>
          <div className="col-6 col-md-3 mb-4">
            <Link to="/lip-care" className="text-decoration-none text-dark">
              <img src="/assets/lip.jpg" alt="Lip Care" className="img-fluid rounded mb-2" />
              <h6>{t('categories.lip')}</h6>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;










  