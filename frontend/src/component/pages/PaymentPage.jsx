import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import '../../style/PaymentPage.css';

const PaymentForm = ({ isAddressConfirmed, totalPrice, selectedAddress, cart }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");

  // handle Pay Now button
  const handlePayNow = (e) => {
    e.preventDefault();
    if (!isAddressConfirmed || !paymentMethod) return;

    // Save last order before payment
    localStorage.setItem("lastOrder", JSON.stringify({
      items: cart,
      totalPrice,
      address: selectedAddress,
      paymentMethod
    }));

    setShowModal(true);

    if (paymentMethod === "Amazon Pay") {
      // simulate QR scan wait
      setTimeout(() => {
        setShowModal(false);
        navigate('/payment-success?redirect_status=succeeded');
      }, 5000);
    }
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    const cardRegex = /^\d{15,16}$/;
    const cvvRegex = /^\d{3,4}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!cardRegex.test(cardNumber)) {
      alert("Enter a valid 15 or 16 digit card number");
      return;
    }
    if (!cvvRegex.test(cvv)) {
      alert("Enter a valid CVV (3 or 4 digits)");
      return;
    }
    if (!expiryRegex.test(expiry)) {
      alert("Enter a valid expiry in MM/YY format");
      return;
    }

    // 🔑 Save last order again here
    localStorage.setItem("lastOrder", JSON.stringify({
      items: cart,
      totalPrice,
      address: selectedAddress,
      paymentMethod: "Credit/Debit Card",
      cardLast4: cardNumber.slice(-4) // optional
    }));

    setShowModal(false);
    navigate('/payment-success?redirect_status=succeeded');
  };


  const handleGiftCardSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("lastOrder", JSON.stringify({
      items: cart,
      totalPrice,
      address: selectedAddress,
      paymentMethod: "Gift Card"
    }));

    setShowModal(false);
    navigate('/payment-success?redirect_status=succeeded');
  };


  return (
    <form onSubmit={handlePayNow} className="payment-form">
      <div className="payment-methods">
        <h3>Select Payment Method</h3>

        <label className="payment-option">
          <input
            type="radio"
            name="paymentMethod"
            value="Amazon Pay"
            onChange={() => setPaymentMethod("Amazon Pay")}
          />
          <img src="/amazon-pay.png" alt="Amazon Pay" className="payment-icon" />
          <span>Amazon Pay</span>
        </label>

        <label className="payment-option">
          <input
            type="radio"
            name="paymentMethod"
            value="Credit/Debit Card"
            onChange={() => setPaymentMethod("Credit/Debit Card")}
          />
          <img src="/credit-card.png" alt="Card" className="payment-icon" />
          <span>Credit/Debit Card</span>
        </label>

        <label className="payment-option">
          <input
            type="radio"
            name="paymentMethod"
            value="Gift Card"
            onChange={() => setPaymentMethod("Gift Card")}
          />
          <img src="/gift-card.png" alt="Gift Card" className="payment-icon" />
          <span>Gift Card</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={!isAddressConfirmed || !paymentMethod}
        className="payment-btn"
      >
        Pay Now
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            {paymentMethod === "Amazon Pay" && (
              <div className="modal-content">
                <h3>Scan QR with Amazon Pay</h3>
                <img src="/qr-dummy.png" alt="QR Code" className="qr-img" />
                <p>Waiting for confirmation...</p>
              </div>
            )}

            {paymentMethod === "Credit/Debit Card" && (
              <div className="modal-content">
                <h3>Enter Card Details</h3>
                <div className="card-form">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                  />
                  <button
                    type="button"
                    className="confirm-btn"
                    onClick={handleCardSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

            {paymentMethod === "Gift Card" && (
              <div className="modal-content">
                <h3>Enter Gift Card Code</h3>
                <div className="card-form">
                  <input
                    type="text"
                    placeholder="Gift Card Code"
                    required
                  />
                  <button
                    type="button"
                    className="confirm-btn"
                    onClick={handleGiftCardSubmit}
                  >
                    Redeem
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
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

        {isAddressConfirmed && (
          <PaymentForm
            isAddressConfirmed={isAddressConfirmed}
            totalPrice={totalPrice}
            selectedAddress={addresses.find(a => a.id === selectedAddressId)}
            cart={location.state?.cart || []}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
