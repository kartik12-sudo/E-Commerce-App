import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";
import "../../style/productList.css";
import { FaStar, FaHeart, FaCartPlus } from "react-icons/fa";
import { formatPrice } from "../../utils/format"; // ✅ import helper
import { toast } from "react-toastify";

const ProductList = ({ products }) => {
  const { cart, dispatch } = useCart();

  const addToCart = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const incrementItem = (product) => {
    dispatch({ type: "INCREMENT_ITEM", payload: product });
  };

  const decrementItem = (product) => {
    const cartItem = cart.find((item) => item.id === product.id);
    if (cartItem && cartItem.quantity > 1) {
      dispatch({ type: "DECREMENT_ITEM", payload: product });
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: product });
    }
  };

  return (
    <div className="product-grid">
      {products.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id);

        // ✅ ensure numeric price for discount calculations
        const basePrice = Number(product.price) || 0;
        const discount = Number(product.discount) || 0;
        const discountedPrice = basePrice * (1 - discount / 100);

        return (
          <div className="product-card" key={product.id}>
            <div className="product-badge">
              {discount > 0 && `-${discount}%`}
            </div>
            <button
              className="wishlist-btn"
              title="Add to Wishlist" // ✅ shows text on hover
              onClick={async (e) => {
                e.preventDefault(); // ✅ avoid navigating when inside <Link>
                try {
                  const res = await ApiService.addToWishlist(product.id);
                  toast.success(res.message || "Added to wishlist ❤️");
                } catch (err) {
                  toast.error(err.response?.data?.message || "Failed to add to wishlist");
                }
              }}
            >
              <FaHeart />
            </button>
            <Link to={`/product/${product.id}`}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-desc">
                  {product.description
                    ? product.description.substring(0, 60) + "..."
                    : ""}
                </p>
                <div className="product-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < product.rating ? "star-filled" : "star-empty"}
                    />
                  ))}
                  <span>({product.reviewCount || 0})</span>
                </div>
                <div className="product-price">
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
            {cartItem ? (
              <div className="quantity-controls">
                <button onClick={() => decrementItem(product)}>-</button>
                <span>{cartItem.quantity}</span>
                <button onClick={() => incrementItem(product)}>+</button>
              </div>
            ) : (
              <button
                className="add-to-cart"
                onClick={() => addToCart(product)}
              >
                <FaCartPlus /> Add to Cart
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
