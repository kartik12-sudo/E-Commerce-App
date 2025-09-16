import React, { useEffect, useState } from 'react';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import '../../style/PaymentPage.css';

const stripePromise = loadStripe(
  'pk_test_51S3zEiRCaYDnuBMfKNYrvct2SSH9lG5pMFsK6VwXguRS1pz9b2b2Aaf8ASGYFzBdlSZGiEi8ZfvtLjE4ceh11rnR00XqRpFIKL'
);

const PaymentForm = ({ clientSecret, isAddressConfirmed, totalPrice, selectedAddress, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !isAddressConfirmed) return;

    // ✅ Save last order before redirect
    localStorage.setItem("lastOrder", JSON.stringify({
      items: cart,
      totalPrice,
      address: selectedAddress
    }));

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
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
        disabled={!stripe || isLoading || !isAddressConfirmed}
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
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState(null);
  const [message, setMessage] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);
  const { totalPrice } = location.state || {};

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/payment/create-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...ApiService.getHeader()
          },
          body: JSON.stringify({ amount: Math.round(totalPrice ) })
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



  // Fetch user addresses
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await ApiService.getLoggedInUserInfo();
        if (response.user.addresses && response.user.addresses.length > 0) {
          setAddresses(response.user.addresses);
        } else {
          navigate('/add-address'); // redirect if no address
        }
      } catch (err) {
        setMessage('Unable to fetch user addresses');
      }
    };

    fetchUserInfo();
  }, [navigate]);

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
          <>
            {/* Address Selection */}
            <div className="address-section">
              <h3>Select Shipping Address</h3>
              {addresses.map((addr) => (
                <div key={addr.id} className="address-option">
                  <input
                    type="radio"
                    name="selectedAddress"
                    value={addr.id}
                    checked={selectedAddressId === addr.id}
                    onChange={() => {
                      setSelectedAddressId(addr.id);
                      setIsAddressConfirmed(false); // reset confirmation
                    }}
                  />
                  <label>
                    <p><strong>{addr.street}, {addr.city}</strong></p>
                    <p>{addr.state}, {addr.zipCode}, {addr.country}</p>
                  </label>
                </div>
              ))}

              {selectedAddressId && (
                <button
                  className="confirm-address-btn"
                  onClick={() => {
                    const selectedAddress = addresses.find(a => a.id === selectedAddressId);
                    localStorage.setItem("lastOrder", JSON.stringify({
                      items: location.state?.cart || [],
                      totalPrice,
                      address: selectedAddress
                    }));
                    setIsAddressConfirmed(true);
                  }}
                >
                  Confirm Selected Address
                </button>

              )}
            </div>

            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm
                clientSecret={clientSecret}
                isAddressConfirmed={isAddressConfirmed}
                totalPrice={totalPrice}
                selectedAddress={addresses.find(a => a.id === selectedAddressId)}
                cart={location.state?.cart || []}
              />
            </Elements>

          </>
        ) : (
          <div>Loading payment form...</div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
