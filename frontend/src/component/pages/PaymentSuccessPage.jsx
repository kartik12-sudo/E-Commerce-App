// src/component/pages/PaymentSuccessPage.jsx
import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ApiService from '../../service/ApiService';
import '../../style/PaymentSuccess.css';

const PaymentSuccessPage = () => {
  const { cart, dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState(null);

  // Parse query params from Stripe
  const params = new URLSearchParams(location.search);
  const redirectStatus = params.get('redirect_status');

  useEffect(() => {
    const placeOrder = async () => {
      if (redirectStatus === 'succeeded' && cart.length > 0) {
        try {
          const orderItems = cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          }));
          const totalPrice = cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
          const orderRequest = { totalPrice, items: orderItems };

          const response = await ApiService.createOrder(orderRequest);

          if (response.status === 200) {
            dispatch({ type: 'CLEAR_CART' });
          } else {
            setMessage(response.message || 'Order placement failed after payment');
          }
        } catch (err) {
          setMessage('Order placement failed after payment');
        }
      }
    };

    placeOrder();
  }, [redirectStatus, cart, dispatch]);

  return (
    <div className="payment-success-page">
      <div className="payment-success-card">
        {redirectStatus === 'succeeded' ? (
          <>
            <h2 className="success-title">🎉 Payment Successful!</h2>
            <p className="success-message">
              Your order has been placed. Thank you for shopping with us.
            </p>
            {message && <p className="error-message">{message}</p>}
          </>
        ) : (
          <>
            <h2 className="error-title">⚠️ Payment Failed</h2>
            <p className="error-message">
              Your payment could not be processed. Please try again or use a different method.
            </p>
          </>
        )}
        <button
          className="success-btn"
          onClick={() => navigate('/profile')}
        >
          Go to Order History
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
