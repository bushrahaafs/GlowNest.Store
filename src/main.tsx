import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n'; // للترجمة i18n


import 'bootstrap/dist/css/bootstrap.min.css'; // استدعاء البوتستراب

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);




