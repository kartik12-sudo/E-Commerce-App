// src/component/pages/AdminOrderDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../style/adminOrderDetails.css";
import ApiService from "../../service/ApiService";
import { toast } from "react-toastify";

const OrderStatus = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
];

const AdminOrderDetailsPage = () => {
  const { itemId } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    fetchOrderDetails(itemId);
  }, [itemId]);

  const fetchOrderDetails = async (itemId) => {
    try {
      const response = await ApiService.getOrderItemById(itemId);
      setOrderItems(response.orderItemList || []);
    } catch (error) {
      toast.error(error.message || "Failed to fetch order details");
    }
  };

  const handleStatusChange = (orderItemId, newStatus) => {
    setSelectedStatus({ ...selectedStatus, [orderItemId]: newStatus });
  };

  const handleSubmitStatusChange = async (orderItemId) => {
    try {
      await ApiService.updateOrderitemStatus(
        orderItemId,
        selectedStatus[orderItemId]
      );
      toast.success("Order item status updated ✅");
      fetchOrderDetails(itemId); // refresh status
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to update order item status"
      );
    }
  };

  return (
    <div className="order-details-page">
      <h2>Order Details</h2>
      {orderItems.length ? (
        orderItems.map((orderItem) => {
          const addr =
            orderItem.user.addresses && orderItem.user.addresses.length > 0
              ? orderItem.user.addresses[0]
              : null;

          return (
            <div key={orderItem.id} className="order-item-details">
              <div className="info">
                <h3>Order Information</h3>
                <p>
                  <strong>Order Item ID:</strong> {orderItem.id}
                </p>
                <p>
                  <strong>Quantity:</strong> {orderItem.quantity}
                </p>
                <p>
                  <strong>Total Price:</strong> {orderItem.price}
                </p>
                <p>
                  <strong>Order Status:</strong> {orderItem.status}
                </p>
                <p>
                  <strong>Date Ordered:</strong>{" "}
                  {new Date(orderItem.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="info">
                <h3>User Information</h3>
                <p>
                  <strong>Name:</strong> {orderItem.user.name}
                </p>
                <p>
                  <strong>Email:</strong> {orderItem.user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {orderItem.user.phoneNumber}
                </p>
                <p>
                  <strong>Role:</strong> {orderItem.user.role}
                </p>

                <div className="info">
                  <h3>Delivery Address</h3>
                  {addr ? (
                    <>
                      <p>
                        <strong>Country:</strong> {addr.country}
                      </p>
                      <p>
                        <strong>State:</strong> {addr.state}
                      </p>
                      <p>
                        <strong>City:</strong> {addr.city}
                      </p>
                      <p>
                        <strong>Street:</strong> {addr.street}
                      </p>
                      <p>
                        <strong>Zip Code:</strong> {addr.zipcode}
                      </p>
                    </>
                  ) : (
                    <p>No address available</p>
                  )}
                </div>
              </div>

              <div>
                <h2>Product Information</h2>
                <img
                  src={orderItem.product.imageUrl}
                  alt={orderItem.product.name}
                />
                <p>
                  <strong>Name:</strong> {orderItem.product.name}
                </p>
                <p>
                  <strong>Description:</strong> {orderItem.product.description}
                </p>
                <p>
                  <strong>Price:</strong> {orderItem.product.price}
                </p>
              </div>

              <div className="status-change">
                <h4>Change Status</h4>
                <select
                  className="status-option"
                  value={selectedStatus[orderItem.id] || orderItem.status}
                  onChange={(e) =>
                    handleStatusChange(orderItem.id, e.target.value)
                  }
                >
                  {OrderStatus.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <button
                  className="update-status-button"
                  onClick={() => handleSubmitStatusChange(orderItem.id)}
                >
                  Update Status
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>Loading order details ....</p>
      )}
    </div>
  );
};

export default AdminOrderDetailsPage;
