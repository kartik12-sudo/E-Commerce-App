import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import '../../style/PaymentPage.css';

const PaymentForm = ({ isAddressConfirmed, totalPrice, selectedAddress, cart }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAddressConfirmed) return;

    // Save last order
    localStorage.setItem("lastOrder", JSON.stringify({
      items: cart,
      totalPrice,
      address: selectedAddress
    }));

    setIsLoading(true);

    // 🚨 CHEAT: instantly mark as success
    setTimeout(() => {
      navigate('/payment-success?redirect_status=succeeded');
      setIsLoading(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <button
        type="submit"
        disabled={isLoading || !isAddressConfirmed}
        className="payment-btn"
      >
        {isLoading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);
  const [message, setMessage] = useState(null);
  const { totalPrice } = location.state || {};

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await ApiService.getLoggedInUserInfo();
        if (response.user.addresses && response.user.addresses.length > 0) {
          setAddresses(response.user.addresses);
        } else {
          navigate('/add-address');
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
                  setIsAddressConfirmed(false);
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

        <PaymentForm
          isAddressConfirmed={isAddressConfirmed}
          totalPrice={totalPrice}
          selectedAddress={addresses.find(a => a.id === selectedAddressId)}
          cart={location.state?.cart || []}
        />
      </div>
    </div>
  );
};

export default PaymentPage;
