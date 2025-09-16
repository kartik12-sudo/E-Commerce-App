import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaHeadphones } from "react-icons/fa";
import "../../style/footer.css";
import ApiService from "../../service/ApiService";

const Footer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await ApiService.getAllCategory();
      setCategories(response.categoryList || []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  return (
    <>
      <footer className="electronics-footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3 className="footer-title">
              <FaRobot className="icon" /> Categories
            </h3>
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/category/${category.id}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">
              <FaHeadphones className="icon" /> Connect
            </h3>
            <div className="newsletter">
              <p>Subscribe for tech updates</p>
              <p>electrohub@gmail.com</p>
            </div>
            <div className="social-links">
              <Link to="/"><i className="fab fa-facebook"></i></Link>
              <Link to="/"><i className="fab fa-twitter"></i></Link>
              <Link to="/"><i className="fab fa-instagram"></i></Link>
              <Link to="/"><i className="fab fa-youtube"></i></Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="tech-grid">
            <div className="grid-item">4K Resolution</div>
            <div className="grid-item">5G Ready</div>
            <div className="grid-item">AI Powered</div>
            <div className="grid-item">OLED Display</div>
          </div>
          <p>© {new Date().getFullYear()} ELECTROHUB. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
