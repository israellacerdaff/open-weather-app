import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style/reset.css';
import './style/normalize.css';
import App from './App';
import Header from './components/Header';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <App />
  </React.StrictMode>
);

reportWebVitals();
