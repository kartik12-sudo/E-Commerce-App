import React from 'react';
import { Link } from 'react-router-dom';
import './about.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Banner -*/}
      <section className="about-hero-banner">
        <div className="hero-content">
          <h1>About ElectroHub</h1>
          <p className="hero-tagline">Redefining Electronics Shopping with Innovation, Quality, and Customer Focus</p>
        </div>
      </section>

      <main className="about-container">
        {/* About Description */}
        <section className="about-description">
          <p>
            At ElectroHub, we're revolutionizing the way people shop for electronics. We bring cutting-edge technology 
            directly to your doorstep with an unparalleled selection of gadgets, devices, and accessories. Our curated 
            collection features only the highest quality products from trusted brands worldwide.
          </p>
        </section>

        {/* Our Mission */}
        <section className="about-mission">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                There's a common notion that business growth requires compromise—but we've proven there's a better way. 
                At ElectroHub, we believe that what's good for customers is ultimately good for business. We're committed 
                to creating a sustainable electronics marketplace where quality, innovation, and customer satisfaction 
                drive our success.
              </p>
              <p>
                Our mission is to make premium technology accessible to everyone while maintaining the highest standards 
                of product quality, customer service, and ethical business practices. We're building more than just a store—we're 
                creating a community of tech enthusiasts who value excellence and integrity.
              </p>
            </div>
            <div className="mission-image">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Our Mission" />
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="about-values">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h6l-4 8 12-10h-6l4-8z" />
                </svg>
              </div>
              <h3>Innovation</h3>
              <p>We constantly seek the latest technological advancements to bring you cutting-edge products.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Quality Assurance</h3>
              <p>Every product undergoes rigorous testing to ensure it meets our high standards.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3>Transparency</h3>
              <p>We believe in honest business practices and clear product information.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3>Customer First</h3>
              <p>Our customers are at the heart of everything we do.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="about-why">
          <h2>Why Choose ElectroHub?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3>Verified Authenticity</h3>
              <p>All products are 100% genuine with manufacturer warranties.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3>Fast Delivery</h3>
              <p>Quick shipping with robust packaging for safe delivery.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3>Expert Support</h3>
              <p>Our tech specialists provide guidance before and after purchase.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3>Flexible Payments</h3>
              <p>Multiple secure payment methods including EMI options.</p>
            </div>
          </div>
        </section>

        {/* Quick Links & Customer Service */}
        <div className="about-sections">
          <section className="links-section">
            <h2>Quick Links</h2>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop Now</Link></li>
              
            </ul>
          </section>

          
        </div>
      </main>
    </div>
  );
};

export default AboutPage;