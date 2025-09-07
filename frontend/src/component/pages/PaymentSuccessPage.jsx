import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../../style/PaymentSucess.css'; 



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
    <div className="payment-success-page">
      <div className="payment-success-card">
        {redirectStatus === 'succeeded' ? (
          <>
            <h2 className="success-title">🎉 Payment Successful!</h2>
            <p className="success-message">
              Your order has been placed. Thank you for shopping with us.
            </p>
          </>
        ) : (
          <>
            <h2 className="error-title">⚠️ Payment Failed</h2>
            <p className="error-message">
              Your payment could not be processed. Please try again or use a different payment method.
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
