import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CartProvider } from './context/CartContext'; // <-- IMPORT PROVIDER

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>  {/* <-- WRAP APP WITH PROVIDER */}
      <App />
    </CartProvider>
  </React.StrictMode>,
);
