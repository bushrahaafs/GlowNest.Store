import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SoapsPage from './pages/SoapsPage';
import SerumsPage from './pages/SerumsPage';
import OilsPage from './pages/OilsPage';
import LipCarePage from './pages/LipCarePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import DeliveryPage from './pages/DeliveryPage';
import PaymentPage from './pages/PaymentPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import FavoritesPage from './pages/FavoritesPage';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './components/PrivateRoute';
import DiscountBanner from './components/DiscountBanner';
import { useDarkMode } from './hooks/useDarkMode';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useDarkMode();
  useTranslation(); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);  

  return (
    <Router>
      <div className="app-container"> {/* ← يغلف الصفحة ويعطي خلفية كاملة */}
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <DiscountBanner />

        <div style={{ flex: 1, backgroundColor: 'var(--page-bg)' }}> {/* ← يغطي كل المحتوى تحت النافبار */}
          <Routes>
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/soaps" element={<SoapsPage />} />
            <Route path="/serums" element={<SerumsPage />} />
            <Route path="/oils" element={<OilsPage />} />
            <Route path="/lip-care" element={<LipCarePage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/payment" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
          </Routes>
        </div>

        <Footer />
      </div>

      <ToastContainer 
        position="top-center" 
        autoClose={2000} 
        hideProgressBar 
        closeOnClick 
        pauseOnHover={false} 
        theme="light"
      />
    </Router>
  );
};

export default App;




















