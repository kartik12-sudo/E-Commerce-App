import React, { useEffect, useState } from "react";
import ProductList from "../common/ProductList";
import ApiService from "../../service/ApiService";
import "../../style/ShopPage.css"; 

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    ApiService.getAllCategory()
      .then((res) => {
        setCategories(res.categoryList || []);
      })
      .catch((err) => {
        console.error("❌ Error loading categories:", err);
      });
  }, []);


  useEffect(() => {
    ApiService.getAllProducts()
      .then((data) => {
        console.log("🔍 Products API response:", data);

        // Defensive: extract array safely
        let productsData = [];
        if (data && Array.isArray(data.productList)) {
          productsData = data.productList;
        } else if (Array.isArray(data)) {
          productsData = data;
        }
        
        setProducts(productsData);
        setFilteredProducts(productsData);
      })
      .catch((err) => {
        console.error("❌ Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter products by category
  useEffect(() => {
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => 
        // product.category && product.category.toLowerCase() === category
        product.category && product.category.name && product.category.name.toLowerCase() === category
      ));
    }
  }, [category, products]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const resetFilters = () => {
    setCategory("all");
  };

  return (
    <div className="shop-container">
      <h2 className="shop-heading">Shop Products</h2>

      {/* Filter section */}
      <div className="filter-section">
        <select 
          className="filter-select"
          value={category} 
          onChange={handleCategoryChange}
        >
          <option value="all">All Products</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name.toLowerCase()}>
              {cat.name}
            </option>
          ))}
        </select>
        
        <button className="gradient-btn" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      {loading && <p className="loading-text">⏳ Loading products...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && filteredProducts.length === 0 && (
        <p className="empty-text">No products available.</p>
      )}

      <ProductList products={filteredProducts} />
    </div>
  );
};

export default ShopPage;