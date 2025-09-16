import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/profile.css';
import Pagination from "../common/Pagination";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Popup state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [eta, setEta] = useState(6);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await ApiService.getLoggedInUserInfo();
      setUserInfo(response.user);
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Unable to fetch user info");
    }
  };

  // ETA countdown simulation
  useEffect(() => {
    if (!selectedOrder) return;
    const interval = setInterval(() => {
      setEta((prev) => {
        if (prev <= 0) return 6; // reset to 6
        return prev - 1;
      });
    }, 2000); // 2 seconds = 1 day simulation
    return () => clearInterval(interval);
  }, [selectedOrder]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const orderItemList = userInfo.orderItemList || [];
  const totalPages = Math.ceil(orderItemList.length / itemsPerPage);
  const paginatedOrders = orderItemList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="profile-page">
      <h2>Welcome {userInfo.name}</h2>

      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div>
          <p><strong>Name: </strong>{userInfo.name}</p>
          <p><strong>Email: </strong>{userInfo.email}</p>
          <p><strong>Phone Number: </strong>{userInfo.phoneNumber}</p>

          {/* Addresses */}
          <div>
            <h3>Addresses</h3>
            {userInfo.addresses && userInfo.addresses.length > 0 ? (
              userInfo.addresses.map((addr) => (
                <div key={addr.id} className="address-card">
                  <p><strong>Street: </strong>{addr.street}</p>
                  <p><strong>City: </strong>{addr.city}</p>
                  <p><strong>State: </strong>{addr.state}</p>
                  <p><strong>Zip Code: </strong>{addr.zipCode}</p>
                  <p><strong>Country: </strong>{addr.country}</p>

                  <div className="address-actions">
                    <button
                      className="profile-button"
                      onClick={() => navigate(`/edit-address/${addr.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="profile-button delete"
                      onClick={async () => {
                        if (window.confirm("Are you sure you want to delete this address?")) {
                          await ApiService.deleteAddress(addr.id);
                          fetchUserInfo();
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No address information available</p>
            )}

            <button
              className="profile-button add-new"
              onClick={() => navigate("/add-address")}
            >
              Add New Address
            </button>
          </div>

          {/* Order History */}
          <h3>Order History</h3>
          <ul>
            {paginatedOrders.map((order) => (
              <li key={order.id} onClick={() => { setSelectedOrder(order); setEta(6); }}>
                <img src={order.product?.imageUrl} alt={order.product?.name} />
                <div>
                  <p><strong>Name: </strong>{order.product?.name}</p>
                  <p><strong>Status: </strong>{order.status}</p>
                  <p><strong>Quantity: </strong>{order.quantity}</p>
                  <p><strong>Price: </strong>{order.price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      {/* 🔹 Popup Modal with Address */}
      {selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setSelectedOrder(null)}>✖</button>
            <h3>📦 Order Details</h3>
            <img src={selectedOrder.product?.imageUrl} alt={selectedOrder.product?.name} />
            <p><strong>Name:</strong> {selectedOrder.product?.name}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
            <p><strong>Price:</strong> ${selectedOrder.price.toFixed(2)}</p>

            {/* Address for the order */}
            {userInfo.addresses && userInfo.addresses.length > 0 && (
              <div className="modal-address">
                <h4>📍 Shipping Address</h4>
                <p>{userInfo.addresses[0].street}</p>
                <p>{userInfo.addresses[0].city}, {userInfo.addresses[0].state} {userInfo.addresses[0].zipCode}</p>
                <p>{userInfo.addresses[0].country}</p>
              </div>
            )}

            <p className="eta">🚚 Estimated Delivery: {eta} days</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
