import React, { useEffect, useState } from "react";
import ProductList from "../common/ProductList";
import ApiService from "../../service/ApiService";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ApiService.getAllProducts()
      .then((data) => {
        console.log("🔍 Products API response:", data);

        // Defensive: extract array safely
        if (data && Array.isArray(data.productList)) {
          setProducts(data.productList);
        } else if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]); 
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>Shop Products</h2>

      {loading && <p style={{ textAlign: "center" }}>⏳ Loading products...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p style={{ textAlign: "center" }}>No products available.</p>
      )}

      <ProductList products={products} />
    </div>
  );
};

export default ShopPage;
