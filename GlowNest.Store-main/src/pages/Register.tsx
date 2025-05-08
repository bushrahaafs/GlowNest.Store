import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { FirebaseError } from 'firebase/app';
import { toast } from 'react-toastify';
import './loginStyles.css';

const Register: React.FC<{ setIsLoggedIn: (val: boolean) => void }> = ({ setIsLoggedIn }) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isStrongPassword = (password: string) =>
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password); // رمز خاص

  useEffect(() => {
    setEmailError(email && !isValidEmail(email) ? t('register.invalidEmail') : '');
  }, [email, t]);

  useEffect(() => {
    setPasswordError(password && !isStrongPassword(password) ? t('register.weakPassword') : '');
    setConfirmPasswordError(
      confirmPassword && password !== confirmPassword ? t('register.passwordMismatch') : ''
    );
  }, [password, confirmPassword, t]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (emailError || passwordError || confirmPasswordError) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        createdAt: new Date().toISOString(),
      });

      toast.success(t('register.success'));
      localStorage.setItem('user', JSON.stringify({ uid: user.uid, name, email }));
      setIsLoggedIn(true);
      navigate('/home');
    } catch (error) {
      const err = error as FirebaseError;
      const code = err.code;

      if (code === 'auth/email-already-in-use') {
        toast.error(t('register.emailInUse'));
      } else if (code === 'auth/invalid-email') {
        toast.error(t('register.invalidEmail'));
      } else if (code === 'auth/weak-password') {
        toast.error(t('register.weakPassword'));
      } else {
        toast.error(t('register.error'));
      }
    }
  };

  return (
    <div  className={`container-fluid min-vh-100 d-flex align-items-center justify-content-center ${i18n.language === 'ar' ? 'rtl' : ''}`}
    style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} // ← تعديل لتطبيق الثيم
  >
      <div className="row shadow rounded overflow-hidden" style={{ maxWidth: 900, width: '100%' }}>
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-4 login-left">
          <h1 className="fw-bold mb-2">{i18n.language === 'ar' ? 'انضم إلينا!' : 'Join Us!'}</h1>
          <p className="text-light">{i18n.language === 'ar' ? 'سجّل الآن وابدأ رحلتك مع GlowNest' : 'Register now and start your journey with GlowNest.'}</p>
        </div>

        <div className="col-md-6 p-5" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}> {/* ← تعديل لتطبيق الثيم */}
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
                className={`form-control ${emailError ? 'is-invalid' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <div className="invalid-feedback">{emailError}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">{t('register.password')}</label>
              <input
                type="password"
                className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && <div className="invalid-feedback">{passwordError}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">{t('register.confirmPassword')}</label>
              <input
                type="password"
                className={`form-control ${confirmPasswordError ? 'is-invalid' : ''}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {confirmPasswordError && <div className="invalid-feedback">{confirmPasswordError}</div>}
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




















  