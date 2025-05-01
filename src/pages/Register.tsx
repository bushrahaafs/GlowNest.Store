import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { registerUser } from '../services/authService';
import { toast } from 'react-toastify';
import axios from 'axios';
import './loginStyles.css';

const Register: React.FC<{ setIsLoggedIn: (val: boolean) => void }> = ({ setIsLoggedIn }) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isStrongPassword = (password: string) =>
    password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) return toast.error(t('register.invalidEmail'));
    if (!isStrongPassword(password)) return toast.error(t('register.weakPassword'));
    if (password !== confirmPassword) return toast.error(t('register.passwordMismatch'));

    try {
      const res = await registerUser({ name, email, password });
      toast.success(t('register.success'));
      localStorage.setItem('user', JSON.stringify(res));
      setIsLoggedIn(true);
      navigate('/home');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data || t('register.error'));
      } else {
        alert(t('register.unexpected'));
      }
    }
  };

  return (
    <div className={`container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light ${i18n.language === 'ar' ? 'rtl' : ''}`}>
      <div className="row shadow rounded overflow-hidden" style={{ maxWidth: 900, width: '100%' }}>
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-4 login-left">
          <h1 className="fw-bold mb-2">{i18n.language === 'ar' ? 'انضم إلينا!' : 'Join Us!'}</h1>
          <p className="text-light">{i18n.language === 'ar' ? 'سجّل الآن وابدأ رحلتك مع GlowNest' : 'Register now and start your journey with GlowNest.'}</p>
        </div>

        <div className="col-md-6 bg-white p-5">
          <h3 className="text-center mb-3">{t('register.title')}</h3>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">{t('register.name')}</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">{t('register.email')}</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">{t('register.password')}</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">{t('register.confirmPassword')}</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-dark w-100" type="submit">{t('register.submit')}</button>
          </form>

          <div className="text-center mt-3">
            <span>{t('register.haveAccount')}</span> <Link to="/login">{t('register.login')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;


















  