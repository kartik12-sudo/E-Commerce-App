// src/component/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ApiService from "../../service/ApiService";
import "react-toastify/dist/ReactToastify.css";
import "../../style/register.css";
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <button className="back-button" onClick={() => navigate("/")}>
          <FaArrowLeft /> Back to Home
        </button>
        
        <div className="login-header">
          <h2>Create Account</h2>
          <p>Join us and start your shopping journey</p>
        </div>
        
        {message && <p className="message">{message}</p>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="login-button">
            {loading ? <div className="loader"></div> : "Create Account"}
          </button>

          <div className="register-link">
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          </div>
        </form>
        
        <div className="login-footer">
          <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default RegisterPage;