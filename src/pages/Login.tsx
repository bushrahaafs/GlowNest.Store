import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { loginUser } from '../services/authService';
import { toast } from 'react-toastify';
import axios from 'axios';
import './loginStyles.css';

const saveUser = (user: Record<string, unknown>, rememberMe: boolean) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem('user', JSON.stringify(user));
};

const Login: React.FC<{ setIsLoggedIn: (val: boolean) => void }> = ({ setIsLoggedIn }) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setEmail(user.email || '');
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = t('login.emailRequired');
    if (!password.trim()) newErrors.password = t('login.passwordRequired');
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await loginUser({ email, password });
      const user = res.user;
      saveUser(user, rememberMe);
      toast.success(t('login.success'));
      setIsLoggedIn(true);
      navigate('/home');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data || t('login.error'));
      } else {
        alert(t('login.unexpected'));
      }
    }
  };

  return (
    <div className={`container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light ${i18n.language === 'ar' ? 'rtl' : ''}`}>
      <div className="row shadow rounded overflow-hidden" style={{ maxWidth: 900, width: '100%' }}>
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-4 login-left">
          <h1 className="fw-bold mb-2">{i18n.language === 'ar' ? 'مرحباً بعودتك!' : 'Welcome Back!'}</h1>
          <p className="text-light">{i18n.language === 'ar' ? 'سجّل دخولك لمتابعة التسوق' : 'Login to continue shopping with GlowNest.'}</p>
        </div>

        <div className="col-md-6 bg-white p-5">
          <h3 className="text-center mb-3">{t('login.title')}</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">{t('login.email')}</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">{t('login.password')}</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label className="form-check-label" htmlFor="rememberMe">{t('login.rememberMe')}</label>
            </div>

            <button type="submit" className="btn btn-dark w-100">{t('login.submit')}</button>
          </form>

          <div className="text-center mt-3">
            <span>{t('login.noAccount')}</span> <Link to="/register">{t('login.signup')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

























  