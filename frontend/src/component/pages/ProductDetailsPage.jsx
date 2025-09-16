import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/productDetailsPage.css";

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const { cart, dispatch } = useCart();

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]); 
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        fetchProduct();
        fetchReviews();
    }, [productId]);

    const fetchProduct = async () => {
        try {
            const response = await ApiService.getProductById(productId);
            setProduct(response.product);
        } catch (error) {
            console.error(error.message || error);
        }
    };

    const fetchReviews = async () => {
        try {
            const data = await ApiService.getReviewsByProduct(productId);
            setReviews(data);  // already List<ReviewResponse>
        } catch (err) {
            console.error("Error fetching reviews", err);
        }
    };

    const addToCart = () => {
        if (product) {
            dispatch({ type: 'ADD_ITEM', payload: product });   
        }
    };

    const incrementItem = () => {
        if (product) {
            dispatch({ type: 'INCREMENT_ITEM', payload: product });
        }
    };

    const decrementItem = () => {
        if (product) {
            const cartItem = cart.find(item => item.id === product.id);
            if (cartItem && cartItem.quantity > 1) {
                dispatch({ type: 'DECREMENT_ITEM', payload: product }); 
            } else {
                dispatch({ type: 'REMOVE_ITEM', payload: product }); 
            }
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0 || reviewText.trim() === "") {
            toast.error("Please provide a rating and review text.");
            return;
        }

        try {
            const newReview = await ApiService.createReview({
                content: reviewText,
                rating,
                productId: Number(productId)
            });

            // Update UI immediately
            setReviews([newReview, ...reviews]);
            setRating(0);
            setReviewText("");

            toast.success("Review submitted successfully!");
        } catch (err) {
            console.error("Error submitting review", err);
            if (err.response?.data?.message) {
                toast.error(err.response.data.message); // backend message (duplicate etc.)
            } else {
                toast.error("Failed to submit review.");
            }
        }
    };

    if (!product) {
        return <p>Loading product details ...</p>;
    }

    const cartItem = cart.find(item => item.id === product.id);

    return (
        <div className="product-detail">
            <img src={product?.imageUrl} alt={product?.name} />
            <h1>{product?.name}</h1>
            <p className="product-description">{product?.description}</p>
            <span className="product-price">${product.price.toFixed(2)}</span>

            {cartItem ? (
                <div className="quantity-controls">
                    <button onClick={decrementItem}>-</button>
                    <span>{cartItem.quantity}</span>
                    <button onClick={incrementItem}>+</button>
                </div>
            ) : (
                <button className="add-to-cart-btn" onClick={addToCart}>Add To Cart</button>
            )}

            {/* --- Reviews Section --- */}
            <div className="reviews-section">
                <h2>Customer Reviews</h2>
                <form onSubmit={handleReviewSubmit} className="review-form">
                    <div className="star-rating">
                        {[1,2,3,4,5].map(star => (
                            <span
                                key={star}
                                className={`star ${star <= (hoverRating || rating) ? "filled" : ""}`}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <textarea 
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your review..."
                    />
                    <button type="submit" className="submit-review-btn">Submit Review</button>
                </form>

                <div className="review-list">
                    {reviews.length === 0 ? (
                        <p className="no-reviews">No reviews yet. Be the first!</p>
                    ) : (
                        reviews.map(r => (
                            <div key={r.id} className="review-item">
                                <div className="review-stars">
                                    {"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}
                                </div>
                                <p><strong>{r.username}</strong> – {r.content}</p>
                                <small>{new Date(r.createdAt).toLocaleString()}</small>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
