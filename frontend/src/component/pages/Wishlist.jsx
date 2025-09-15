import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaHeart, FaShoppingBag, FaArrowLeft } from "react-icons/fa";
import { formatPrice } from "../../utils/format";
import "../../style/Wishlist.css";

const Wishlist = ({ wishlistItems, onRemoveFromWishlist, onAddToCart }) => {
  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <Link to="/" className="back-to-shop">
          <FaArrowLeft /> Back to Shop
        </Link>
        <h1 className="wishlist-title">Your Wishlist</h1>
        <p className="wishlist-subtitle">
          {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">
            <FaHeart />
          </div>
          <h2>Your wishlist is empty</h2>
          <p>Save your favorite items here for easy access later</p>
          <Link to="/" className="wishlist-empty-btn">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((product) => {
            const basePrice = Number(product.price) || 0;
            const discount = Number(product.discount) || 0;
            const discountedPrice = basePrice * (1 - discount / 100);

            return (
              <div className="wishlist-card" key={product.id}>
                <div className="product-badge">
                  {discount > 0 && `-${discount}%`}
                </div>
                <button 
                  className="wishlist-remove-btn"
                  onClick={() => onRemoveFromWishlist(product)}
                >
                  <FaHeart />
                </button>
                <Link to={`/product/${product.id}`} className="product-link">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="wishlist-image"
                  />
                  <div className="wishlist-info">
                    <h3 className="wishlist-product-title">{product.name}</h3>
                    <p className="wishlist-product-desc">
                      {product.description
                        ? product.description.substring(0, 60) + "..."
                        : ""}
                    </p>
                    <div className="wishlist-rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < product.rating ? "star-filled" : "star-empty"}
                        />
                      ))}
                      <span>({product.reviewCount || 0})</span>
                    </div>
                    <div className="wishlist-price">
                      {discount > 0 && (
                        <span className="original-price">
                          {formatPrice(basePrice)}
                        </span>
                      )}
                      <span className="current-price">
                        {formatPrice(discountedPrice)}
                      </span>
                    </div>
                  </div>
                </Link>
                <button
                  className="wishlist-add-to-cart"
                  onClick={() => onAddToCart(product)}
                >
                  <FaShoppingBag /> Move to Cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;