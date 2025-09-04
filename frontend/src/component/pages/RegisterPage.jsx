// src/component/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ApiService from "../../service/ApiService";
import "react-toastify/dist/ReactToastify.css";
import "../../style/register.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loader
    try {
      const response = await ApiService.registerUser(formData);
      if (response.status === 200) {
        toast.info("Redirecting to OTP verification...", { autoClose: 2000 });
        setTimeout(() => {
          navigate("/otp", { state: { email: formData.email } });
        }, 2000);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Unable to register a user"
      );
      toast.error(error.response?.data?.message || "Unable to register a user");
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Phone Number: </label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />

        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? <div className="loader"></div> : "Register"}
        </button>

        <p className="register-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default RegisterPage;
