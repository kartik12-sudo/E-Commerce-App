import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const PaymentSuccessPage = () => {
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Parse query params
  const params = new URLSearchParams(location.search);
  const redirectStatus = params.get('redirect_status');

  useEffect(() => {
    if (redirectStatus === 'succeeded') {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [dispatch, redirectStatus]);

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      {redirectStatus === 'succeeded' ? (
        <>
          <h2>Payment Successful!</h2>
          <p>Your order has been placed. Thank you for shopping with us.</p>
        </>
      ) : (
        <>
          <h2>Payment Failed</h2>
          <p>Your payment could not be processed. Please try again or use a different payment method.</p>
        </>
      )}
      <button onClick={() => navigate('/profile')}>Go to Order History</button>
    </div>
  );
};

export default PaymentSuccessPage;
