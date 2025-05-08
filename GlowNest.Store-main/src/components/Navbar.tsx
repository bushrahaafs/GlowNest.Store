import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logoutUser } from '../utils/auth';
import { getCartItems } from '../utils/cartUtils';
import { FaHeart, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useDarkMode } from '../hooks/useDarkMode';
import { FiSun, FiMoon } from 'react-icons/fi';

interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState<string | null>(null);

  const [theme, toggleTheme] = useDarkMode();

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem('user') || sessionStorage.getItem('user') || 'null'
    );
    if (user?.name) {
      setUserName(user.name);
    }

    const updateCart = () => {
      const items = getCartItems();
      const total = items.reduce((sum, item) => sum + item.quantity, 0);
      setTotalItems(total);
    };

    updateCart();
    window.addEventListener('cartUpdated', updateCart);

    return () => {
      window.removeEventListener('cartUpdated', updateCart);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    navigate('/login', { replace: true });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/soaps?search=${searchQuery}`);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm py-3"
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
    >
      <div className="container">
        <Link to="/home" className="navbar-brand fw-bold fs-3" style={{ color: 'var(--text-color)' }}>
          GlowNest
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-flex align-items-center gap-4">
            <li className="nav-item">
              <Link to="/home" className="nav-link" style={{ color: 'var(--text-color)' }}>
                {t('home')}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/soaps" className="nav-link" style={{ color: 'var(--text-color)' }}>
                {t('soaps')}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/serums" className="nav-link" style={{ color: 'var(--text-color)' }}>
                {t('serums')}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/oils" className="nav-link" style={{ color: 'var(--text-color)' }}>
                {t('oils')}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/lip-care" className="nav-link" style={{ color: 'var(--text-color)' }}>
                {t('lipCare')}
              </Link>
            </li>
          </ul>

          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder={t('search')}
              className="form-control form-control-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                minWidth: '180px',
                backgroundColor: 'var(--card-bg)',
                color: 'var(--text-color)',
                border: '1px solid #ccc'
              }}
            />
          </form>

          <div className="d-flex align-items-center gap-3">
            <button
              onClick={toggleTheme}
              className="btn btn-link p-0 border-0"
              style={{
                color: 'var(--text-color)',
                fontSize: '1.3rem'
              }}
              aria-label="تبديل الثيم"
            >
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>

            <Link to="/favorites" style={{ color: 'var(--text-color)' }}>
              <FaHeart size={20} />
            </Link>

            <Link to="/cart" className="position-relative" style={{ color: 'var(--text-color)' }}>
              <FaShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="dropdown">
              <button
                className="btn btn-link p-0 border-0"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserCircle size={24} style={{ color: 'var(--text-color)' }} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {isLoggedIn ? (
                  <>
                    {userName && (
                      <li>
                        <span className="dropdown-item text-muted">
                          👤 {userName}
                        </span>
                      </li>
                    )}
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        {t('profile')}
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        {t('logout')}
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        {t('login.title')}
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/register">
                        {t('register.title')}
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
























