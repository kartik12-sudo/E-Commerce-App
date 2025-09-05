// src/component/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/register.css";
import { FaEye, FaEyeSlash, FaUser, FaLock, FaArrowLeft } from "react-icons/fa";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // simulate 3s delay with spinner
      setTimeout(async () => {
        const response = await ApiService.loginUser(formData);
        if (response.status === 200) {
          // ✅ save to localStorage
          localStorage.setItem("token", response.token);
          localStorage.setItem("role", response.role);

          // ✅ notify Navbar
          window.dispatchEvent(new Event("loginStatusChanged"));

          // ✅ show toast *before* navigation
          toast.success("🎉 Woohoo! Login successful. Welcome back!", {
            position: "top-center",
            autoClose: 3000,
          });

          // small delay so toast mounts properly
          setTimeout(() => {
            navigate("/"); // go to home
          }, 100);
        }
      }, 3000);
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "❌ Unable to login user",
        { position: "top-center" }
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <button className="back-button" onClick={() => navigate("/")}>
          <FaArrowLeft /> Back to Home
        </button>
        
        <div className="login-header">
          <h2>Welcome Back!</h2>
          <p>Sign in to access your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <div className="input-icon">
              <FaUser />
            </div>
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
            <div className="input-icon">
              <FaLock />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" disabled={loading} className="login-button">
            {loading ? <div className="loader"></div> : "Login"}
          </button>

          <div className="register-link">
            <p>Don't have an account? <Link to="/register">Create Account</Link></p>
          </div>
        </form>
        
        <div className="login-footer">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;