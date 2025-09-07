import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/about.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="about-hero">
        <div className="hero-content">
          <h1 className="gradient-heading">About ElectroHub</h1>
          <p className="hero-tagline">
            Redefining Electronics Shopping with Innovation, Quality, and Customer Focus
          </p>
        </div>
      </section>

      <main className="about-container">
        {/* About Description */}
        <section className="about-description">
          <p>
            At ElectroHub, we're revolutionizing the way people shop for electronics. We bring cutting-edge technology 
            directly to your doorstep with an unparalleled selection of gadgets, devices, and accessories.
          </p>
        </section>

        {/* Our Mission */}
        <section className="about-mission">
          <div className="mission-content">
            <div className="mission-text">
              <h2 className="gradient-heading">Our Mission</h2>
              <p>
                At ElectroHub, we believe that what's good for customers is ultimately good for business. We're committed 
                to creating a sustainable electronics marketplace where quality, innovation, and customer satisfaction drive our success.
              </p>
              <p>
                Our mission is to make premium technology accessible to everyone while maintaining the highest standards 
                of product quality, customer service, and ethical business practices.
              </p>
            </div>
            <div className="mission-image">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" 
                alt="Our Mission" 
              />
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="about-values">
          <h2 className="purple-heading">Our Core Values</h2>
          <div className="values-grid">
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
        </section>

        {/* Why Choose Us */}
        <section className="about-why">
          <h2 className="purple-heading">Why Choose ElectroHub?</h2>
          <div className="features-grid">
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
        </section>

        {/* Quick Links */}
        <div className="about-sections">
          <section className="links-section">
            <h2 className="gradient-heading">Quick Links</h2>
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
