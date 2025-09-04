import React, { useState } from "react";
import "../../style/navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaHeart, FaShoppingBag, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth/session (example)
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left Section - Logo & Navigation */}
      <div className="nav-left">
        <NavLink to="/" className="logo">
          <img
            src="/imagee.png"
            alt="ElectroHub Logo"
            className="logo-image"
          />
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
        <NavLink to="/profile" className="nav-icon">
          <FaUser />
          <span>Profile</span>
        </NavLink>

        

        <NavLink to="/cart" className="nav-icon">
          <FaShoppingBag />
          <span>Bag</span>
        </NavLink>

        {/* Logout with Icon */}
        <button className="nav-icon logout-icon" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;