import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import './loginStyles.css';
import { FirebaseError } from 'firebase/app';

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

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!touched) return;
    setEmailError(email && !/\S+@\S+\.\S+/.test(email) ? t('login.invalidEmail') : '');
    setPasswordError(password === '' ? t('login.passwordRequired') : '');
  }, [email, password, touched, t]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setEmail(user.email || '');
      setRememberMe(true);
    }
  }, []);
//زيادة تحديد مدة الطلوع
  useEffect(() => {
    let logoutTimer: NodeJS.Timeout;
    const timeoutDuration = 600000; 

    const logoutUser = () => {
      toast.info(t('login.sessionExpired'));
      navigate('/login');  };

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(logoutUser, timeoutDuration);
    };

    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keydown', resetTimer);

    resetTimer();

    return () => {
      document.removeEventListener('mousemove', resetTimer);
      document.removeEventListener('keydown', resetTimer);
      clearTimeout(logoutTimer);
    };
  }, [navigate, t]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (emailError || passwordError) return;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.exists() ? userDoc.data() : { email: user.email };

      saveUser({ uid: user.uid, ...userData }, rememberMe);
      toast.success(t('login.success'));
      setIsLoggedIn(true);
      navigate('/home');
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;

        if (errorCode === 'auth/user-not-found') {
          toast.error(t('login.userNotFound'));
        } else if (
          errorCode === 'auth/wrong-password' ||
          errorCode === 'auth/invalid-credential'
        ) {
          toast.error(t('login.invalidPassword'));
        } else {
          toast.error(t('login.error'));
        }
      } else {
        toast.error(t('login.unexpected'));
      }
    }
  };

  const handleResetPassword = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error(t('login.invalidEmail'));
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(t('login.resetEmailSent'));
    } catch {
      toast.error(t('login.resetEmailError'));
    }
  };

  return (
    <div
      className={`container-fluid min-vh-100 d-flex align-items-center justify-content-center ${i18n.language === 'ar' ? 'rtl' : ''}`}
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} // ← تعديل لتطبيق الثيم
    >
      <div className="row shadow rounded overflow-hidden" style={{ maxWidth: 900, width: '100%' }}>
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-4 login-left">
          <h1 className="fw-bold mb-2">{i18n.language === 'ar' ? 'مرحباً بعودتك!' : 'Welcome Back!'}</h1>
          <p className="text-light">{i18n.language === 'ar' ? 'سجّل دخولك لمتابعة التسوق' : 'Login to continue shopping with GlowNest.'}</p>
        </div>

        <div className="col-md-6 p-5" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}>
          <h3 className="text-center mb-3">{t('login.title')}</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">{t('login.email')}</label>
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
              <label className="form-label">{t('login.password')}</label>
              <input
                type="password"
                className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && <div className="invalid-feedback">{passwordError}</div>}
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  {t('login.rememberMe')}
                </label>
              </div>

              <button type="button" className="btn btn-link p-0" onClick={handleResetPassword}>
                {t('login.forgotPassword')}
              </button>
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




























  