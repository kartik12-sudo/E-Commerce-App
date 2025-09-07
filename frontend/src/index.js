import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51S3zEiRCaYDnuBMfKNYrvct2SSH9lG5pMFsK6VwXguRS1pz9b2b2Aaf8ASGYFzBdlSZGiEi8ZfvtLjE4ceh11rnR00XqRpFIKL'); // Replace with your actual key

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>
);

reportWebVitals();