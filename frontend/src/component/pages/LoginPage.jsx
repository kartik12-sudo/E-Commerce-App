// src/component/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/register.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
    <div className="register-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
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
          {loading ? <div className="loader"></div> : "Login"}
        </button>

        <p className="register-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
