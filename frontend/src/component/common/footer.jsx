import React from "react";
import { Link } from "react-router-dom";
import "../../style/footer.css";
import { FaRobot, FaHeadphones, FaLaptop } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="electronics-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">
            <FaRobot className="icon" /> Categories
          </h3>
          <ul>
            <li><Link to="/">Smartphones</Link></li>
            <li><Link to="/">Laptops</Link></li>
            <li><Link to="/">Audio Devices</Link></li>
            <li><Link to="/">Smart Home</Link></li>
            <li><Link to="/">Accessories</Link></li>
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
  );
};

export default Footer;