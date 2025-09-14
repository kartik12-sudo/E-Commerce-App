// src/component/pages/PaymentPage.jsx
import React, { useEffect, useState } from 'react';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import '../../style/PaymentPage.css';

const stripePromise = loadStripe(
  'pk_test_51S3zEiRCaYDnuBMfKNYrvct2SSH9lG5pMFsK6VwXguRS1pz9b2b2Aaf8ASGYFzBdlSZGiEi8ZfvtLjE4ceh11rnR00XqRpFIKL'
);

const PaymentForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Stripe will redirect here with redirect_status
        return_url: window.location.origin + '/payment-success',
      },
    });

    if (error) {
      setMessage(error.message);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="payment-btn"
      >
        {isLoading ? 'Processing...' : 'Pay Now'}
      </button>
      {message && <div className="payment-message">{message}</div>}
    </form>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const [clientSecret, setClientSecret] = useState(null);
  const [message, setMessage] = useState(null);
  const { totalPrice } = location.state || {};

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch('http://localhost:2424/api/payment/create-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: Math.round(totalPrice * 100) })
        });
        const data = await response.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setMessage(data.error || 'Failed to get payment intent');
        }
      } catch (err) {
        setMessage('Error connecting to payment API');
      }
    };

    if (totalPrice) fetchClientSecret();
  }, [totalPrice]);

  if (!totalPrice) {
    return <div className="payment-error">No cart data found. Please go back and try again.</div>;
  }

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h2 className="payment-title">Complete Your Payment</h2>
        <p className="payment-total">Total: ${(totalPrice).toFixed(2)}</p>
        {message && <div className="payment-message">{message}</div>}
        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm clientSecret={clientSecret} />
          </Elements>
        ) : (
          <div>Loading payment form...</div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
