import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ApiService from "../../service/ApiService";

import '../../style/PaymentSuccess.css';

const PaymentSuccessPage = () => {
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showDetails, setShowDetails] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Parse query params from Stripe
  const params = new URLSearchParams(location.search);
  const redirectStatus = params.get('redirect_status');

  useEffect(() => {
  if (redirectStatus === 'succeeded') {
    try {
      const savedOrder = JSON.parse(localStorage.getItem("lastOrder"));

      if (savedOrder) {
        // ✅ Send order to backend
        const placeOrder = async () => {
          try {
            await ApiService.createOrder({
              items: savedOrder.items.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price
              })),
              totalPrice: savedOrder.totalPrice,
              addressId: savedOrder.address?.id,
              paymentMethod: savedOrder.paymentMethod || "COD"
            });
          } catch (err) {
            console.error("Error placing order:", err);
          }
        };

        placeOrder();

        // ✅ Update UI
        setOrderDetails({
          items: savedOrder.items || [],
          totalPrice: savedOrder.totalPrice || 0,
          shippingAddress: savedOrder.address || null,
          etaDays: Math.floor(Math.random() * 5) + 2,
        });

        dispatch({ type: 'CLEAR_CART' });
        localStorage.removeItem("lastOrder");
      }
    } catch (err) {
      console.error("Error retrieving order details:", err);
    }
  }
}, [redirectStatus, dispatch]);


  return (
    <div className="payment-success-page">
      <div className="payment-success-card">
        {redirectStatus === 'succeeded' ? (
          <>
            <h2 className="success-title">🎉 Payment Successful!</h2>
            <p className="success-message">
              Your order has been placed. Thank you for shopping with us.
            </p>

            {/* Toggle Button */}
            {orderDetails && (
              <button
                className="success-btn"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? 'Hide Order Details' : 'View Order Details'}
              </button>
            )}

            {/* Order Details */}
            {showDetails && orderDetails && (
              <div className="order-details">
                <h3>🛍️ Order Summary</h3>
                <ul>
                  {orderDetails.items.map((item, idx) => (
                    <li key={idx} className="order-item">
                      <strong>{item.name}</strong> × {item.quantity} — $
                      {(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <p><strong>Total:</strong> ${orderDetails.totalPrice.toFixed(2)}</p>

                {orderDetails.shippingAddress && (
                  <div className="shipping-address">
                    <h3>📦 Shipping To</h3>
                    <p>{orderDetails.shippingAddress.street}</p>
                    <p>
                      {orderDetails.shippingAddress.city},{' '}
                      {orderDetails.shippingAddress.state}{' '}
                      {orderDetails.shippingAddress.zipCode}
                    </p>
                    <p>{orderDetails.shippingAddress.country}</p>
                  </div>
                )}

                <p className="eta">
                  🚚 Estimated Delivery: {orderDetails.etaDays} days
                </p>
              </div>
            )}

            {/* Go to history button below */}
            <button
              className="success-btn"
              onClick={() => navigate('/profile')}
            >
              Go to Order History
            </button>
          </>
        ) : (
          <>
            <h2 className="error-title">⚠️ Payment Failed</h2>
            <p className="error-message">
              Your payment could not be processed. Please try again or use a different method.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
