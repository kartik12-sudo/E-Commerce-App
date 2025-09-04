// src/component/common/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import "../../style/navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
  FaUserPlus,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // ✅ Check token on mount + listen for login/logout events
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus(); // run once when mounted

    window.addEventListener("loginStatusChanged", checkLoginStatus);
    return () => {
      window.removeEventListener("loginStatusChanged", checkLoginStatus);
    };
  }, []);

  // ✅ Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCartClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowPopup(true);
    } else {
      navigate("/cart");
    }
  };

  const handleSignup = () => {
    setShowPopup(false);
    navigate("/register");
  };

  const handleLogin = () => {
    setShowPopup(false);
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setShowDropdown(false);
    window.dispatchEvent(new Event("loginStatusChanged")); // 🔔 notify all listeners
    navigate("/"); // back to home
  };

  return (
    <>
      <nav className="navbar">
        {/* Left Section - Logo & Navigation */}
        <div className="nav-left">
          <NavLink to="/" className="logo">
            <img src="/imagee.png" alt="ElectroHub Logo" className="logo-image" />
          </NavLink>

          <div className="main-nav">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/blog">Blog</NavLink>
          </div>
        </div>

        {/* Middle Section - Search Bar */}
        <div className="search-container">
          <form className="search-form">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              <FaSearch className="search-icon" />
            </button>
          </form>
        </div>

        {/* Right Section - User Actions */}
        <div className="nav-right">
          <button type="button" className="nav-icon bag-btn" onClick={handleCartClick}>
            <FaShoppingBag />
            <span>Bag</span>
          </button>

          {!isLoggedIn ? (
            <>
              <NavLink to="/register" className="nav-icon">
                <FaUserPlus />
                <span>Sign Up</span>
              </NavLink>
              <NavLink to="/login" className="nav-icon">
                <FaSignInAlt />
                <span>Login</span>
              </NavLink>
            </>
          ) : (
            <div className="profile-dropdown" ref={dropdownRef}>
              <button
                className="nav-icon profile-btn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <FaUser />
                <span>Profile</span>
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/profile");
                    }}
                  >
                    <FaUser /> View Profile
                  </button>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Login Required</h2>
            <p>
              Please login or sign up to access your cart and continue shopping
              with ElectroHub.
            </p>
            <div className="popup-buttons">
              <button className="popup-btn signup-btn" onClick={handleSignup}>
                <FaUserPlus /> Sign Up
              </button>
              <button className="popup-btn login-btn" onClick={handleLogin}>
                <FaSignInAlt /> Login
              </button>
            </div>
            <button className="popup-close" onClick={() => setShowPopup(false)}>
              Continue Browsing
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
