// src/component/pages/Home.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  FaLaptop,
  FaMobileAlt,
  FaCameraRetro,
  FaTags,
  FaTabletAlt,
  FaStar,
  FaTv,
  FaVolumeUp,
  FaHeadphones,
  FaArrowRight,
  FaSearch,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import { FiWatch } from "react-icons/fi";
import ProductList from "../common/ProductList";
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";
import "../../style/home.css";

const itemsPerPage = 10;

const categories = [
  { id: 1, name: "Smartphones", Icon: FaMobileAlt, color: "#6366f1" },
  { id: 2, name: "Laptops", Icon: FaLaptop, color: "#8b5cf6" },
  { id: 3, name: "Audio Devices", Icon: FaHeadphones, color: "#ec4899" },
  { id: 4, name: "Smart Home", Icon: FaTv, color: "#3b82f6" },
  { id: 5, name: "Accessories", Icon: FiWatch, color: "#06b6d4" },
  { id: 6, name: "Drones & Cameras", Icon: FaCameraRetro, color: "#f43f5e" },
  { id: 7, name: "Sale", Icon: FaTags, color: "#ef4444" },
  { id: 8, name: "Tablets", Icon: FaTabletAlt, color: "#a855f7" },
  { id: 9, name: "Best Sellers", Icon: FaStar, color: "#f59e0b" },
  { id: 10, name: "Speakers", Icon: FaVolumeUp, color: "#14b8a6" },
];

// Slideshow data
const heroSlides = [
  {
    id: 1,
    
    image: "/i.jpg",
    ctaText: "Shop Now",
    ctaLink: "/shop"
  },
  {
    id: 2,
    
    image: "/image2.png", 
    ctaText: "View Deals",
    ctaLink: "/shop"
  },
  {
    id: 3,
    
    image: "/image1.png", 
    ctaText: "Explore New",
    ctaLink: "/shop"
  }
];

const Home = () => {
  const { search } = useLocation();
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams(search);
      const searchTerm = params.get("search");
      const response = searchTerm
        ? await ApiService.searchProducts(searchTerm)
        : await ApiService.getAllProducts();

      const list = response.productList || [];
      setAllProducts(list);
      setTotalPages(Math.ceil(list.length / itemsPerPage));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    setVisibleProducts(allProducts.slice(start, start + itemsPerPage));
  }, [allProducts, currentPage]);

  if (loading) {
    return (
      <div className="home-page">
        <div className="skeleton hero-skeleton" />
        <div className="skeleton categories-skeleton" />
        <div className="skeleton products-skeleton" />
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Section with Slideshow */}
      <section className="hhero-section">
        <div className="hhero-slideshow">
          {heroSlides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`hhero-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="hhero-content">
                <div className="hhero-text">
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                  <Link to={slide.ctaLink} className="cta-button">
                    {slide.ctaText}
                  </Link>
                </div>
              </div>
              <div className="hhero-image-container">
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading="lazy"
                  className="hhero-background-image"
                />
                <div className="hhero-overlay"></div>
              </div>
            </div>
          ))}
          
          {/* Navigation arrows */}
          <button className="slideshow-nav slideshow-prev" onClick={goToPrevSlide}>
            <FaChevronLeft />
          </button>
          <button className="slideshow-nav slideshow-next" onClick={goToNextSlide}>
            <FaChevronRight />
          </button>
          
          {/* Dots indicator */}
          <div className="slideshow-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories with Icons */}
      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">Shop By Category</h2>
        </div>
        <div className="category-grid">
          {categories.map(({ id, name, Icon, color }) => (
            <Link to={`/category/${id}`} key={id} className="category-link">
              <div
                className="category-card"
                style={{ "--category-color": color }}
              >
                <div className="category-icon-container">
                  <Icon className="category-icon" />
                </div>
                <h3>{name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Banner */}
      <section className="featured-banner">
        <div className="banner-content">
          <div className="banner-text">
            <span className="banner-badge">Limited Time</span>
            <h2>Summer Tech Sale</h2>
            <p>Up to 30% off on premium electronics</p>
            <Link to="/shop" className="cta-button">
              Shop Now
            </Link>
          </div>
          <div className="banner-features">
            <div className="feature-item">
              <div className="feature-icon">4K</div>
              <span>4K Resolution</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">5G</div>
              <span>5G Ready</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <span>All Powered</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">OLED</div>
              <span>OLED Display</span>
            </div>
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="products-section">
        <div className="section-header">
          <h2 className="section-title">Our Products</h2>
          {allProducts.length > 0 && (
            <div className="products-count">{allProducts.length} products</div>
          )}
        </div>

        {error ? (
          <p className="error-message">{error}</p>
        ) : visibleProducts.length ? (
          <>
            <div className="products-grid">
              {visibleProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img
                      src={product.imageUrl || "/imagee.png"}
                      alt={product.name}
                      loading="lazy"
                      className="product-image"
                    />
                  </div>
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p className="product-price">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or browse our categories</p>
            <Link to="/" className="cta-button">
              Browse All
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;