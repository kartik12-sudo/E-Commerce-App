import React, { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import Wishlist from "./Wishlist"; 
import { toast } from "react-toastify";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
  try {
    const res = await ApiService.getMyWishlist();
    setWishlistItems(res.wishlistList || []); 
  } catch (err) {
    toast.error("Failed to fetch wishlist");
  }
};


  const handleRemoveFromWishlist = async (product) => {
  try {
    const res = await ApiService.removeFromWishlist(product.productId); 
    toast.success(res.message || "Removed from wishlist");
    setWishlistItems((prev) => prev.filter((p) => p.productId !== product.productId));
  } catch (err) {
    toast.error("Failed to remove from wishlist");
  }
};


  const handleAddToCart = (product) => {
    // integrate with cart
    toast.success(`${product.name} moved to cart 🛒`);
  };

  return (
    <Wishlist
      wishlistItems={wishlistItems}
      onRemoveFromWishlist={handleRemoveFromWishlist}
      onAddToCart={handleAddToCart}
    />
  );
};

export default WishlistPage;
