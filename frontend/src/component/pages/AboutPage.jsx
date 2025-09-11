import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/about.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About ElectroHub</h1>
          <p className="tagline">
            Redefining Electronics Shopping with Innovation, Quality, and Customer Focus
          </p>
        </div>
      </section>

      <main className="about-container">
        {/* About Description Card */}
        <div className="card-section">
          <div className="content-card">
            <h2>Welcome to ElectroHub</h2>
            <p>
              At ElectroHub, we're revolutionizing the way people shop for electronics. We bring cutting-edge technology 
              directly to your doorstep with an unparalleled selection of gadgets, devices, and accessories.
            </p>
          </div>
        </div>

        {/* Our Mission Card */}
        <div className="card-section">
          <div className="content-card mission-card">
            <div className="card-content">
              <div className="card-text">
                <h2>Our Mission</h2>
                <p>
                  At ElectroHub, we believe that what's good for customers is ultimately good for business. We're committed 
                  to creating a sustainable electronics marketplace where quality, innovation, and customer satisfaction drive our success.
                </p>
                <p>
                  Our mission is to make premium technology accessible to everyone while maintaining the highest standards 
                  of product quality, customer service, and ethical business practices.
                </p>
              </div>
              <div className="card-image">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" 
                  alt="Our Mission" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Our Values Cards */}
        <div className="card-section">
          <h2>Our Core Values</h2>
          <div className="cards-grid">
            <div className="value-card">
              <h3>Innovation</h3>
              <p>We constantly seek the latest technological advancements to bring you cutting-edge products.</p>
            </div>
            <div className="value-card">
              <h3>Quality Assurance</h3>
              <p>Every product undergoes rigorous testing to ensure it meets our high standards.</p>
            </div>
            <div className="value-card">
              <h3>Transparency</h3>
              <p>We believe in honest business practices and clear product information.</p>
            </div>
            <div className="value-card">
              <h3>Customer First</h3>
              <p>Our customers are at the heart of everything we do.</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Cards */}
        <div className="card-section">
          <h2>Why Choose ElectroHub?</h2>
          <div className="cards-grid">
            <div className="feature-card">
              <h3>Verified Authenticity</h3>
              <p>All products are 100% genuine with manufacturer warranties.</p>
            </div>
            <div className="feature-card">
              <h3>Fast Delivery</h3>
              <p>Quick shipping with robust packaging for safe delivery.</p>
            </div>
            <div className="feature-card">
              <h3>Expert Support</h3>
              <p>Our tech specialists provide guidance before and after purchase.</p>
            </div>
            <div className="feature-card">
              <h3>Flexible Payments</h3>
              <p>Multiple secure payment methods including EMI options.</p>
            </div>
          </div>
        </div>

        {/* Quick Links Card */}
        <div className="card-section">
          <div className="content-card links-card">
            <h2>Quick Links</h2>
            <div className="links-container">
              <Link to="/" className="gradient-btn">Home</Link>
              <Link to="/shop" className="gradient-btn">Shop Now</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;