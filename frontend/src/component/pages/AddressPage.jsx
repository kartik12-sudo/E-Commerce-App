import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import "../../style/address.css";

const AddressPage = ({ isEdit }) => {
  const { id } = useParams(); // only defined if editing
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && id) {
      fetchAddressForEdit(id);
    }
  }, [isEdit, id]);

  // ✅ Fetch a single address to edit
  const fetchAddressForEdit = async (addressId) => {
    try {
      const response = await ApiService.getLoggedInUserInfo();
      const addr = response.user.addresses.find((a) => a.id === parseInt(addressId));
      if (addr) setAddress(addr);
      else setError("Address not found");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch address info"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiService.saveAddress(address); // same API for add & update
      navigate("/profile");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to save/update address"
      );
    }
  };

  return (
    <div className="address-page">
      <h2>{isEdit ? "Edit Address" : "Add Address"}</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Street:
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Zip Code:
          <input
            type="text"
            name="zipCode"
            value={address.zipCode}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Country:
          <input
            type="text"
            name="country"
            value={address.country}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">{isEdit ? "Update Address" : "Save Address"}</button>
      </form>
    </div>
  );
};

export default AddressPage;
