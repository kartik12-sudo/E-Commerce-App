// src/component/pages/CategoryProductsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import ProductList from "../common/ProductList";
import Pagination from "../common/Pagination";
import "../../style/home.css";

const CategoryProductsPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const [priceFilter, setPriceFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 8;

  useEffect(() => {
    fetchProducts();
  }, [categoryId, currentPage]);

  const fetchProducts = async () => {
    try {
      setError(null);
      setLoading(true); // ✅ start loading

      let allProducts = [];
      if (categoryId === "14") {
        // 🔥 Best Sellers
        allProducts = await ApiService.getBestSellers();
      } else {
        const response = await ApiService.getAllProductsByCategoryId(categoryId);
        allProducts = Array.isArray(response.productList)
          ? response.productList
          : [];
      }

      setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
      setProducts(
        allProducts.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );
    } catch (error) {
      setProducts([]);
      setError(
        error.response?.data?.message ||
        error.message ||
        "Unable to fetch products"
      );
    } finally {
      setLoading(false); // ✅ always stop loading
    }
  };


  // ✅ Apply price filter
  const filteredProducts = products.filter(
    (p) => !priceFilter || p.price <= Number(priceFilter)
  );

  return (
    <div className="home">
      {loading ? (
        <p className="loading-message">⏳ Loading products, please wait...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div>
          {/* ✅ Price Filter Bar */}
          <div className="filter-bar">
            <label>
              Max Price: ₹
              <input
                type="number"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                placeholder="Enter price"
              />
            </label>
          </div>

          {filteredProducts.length > 0 ? (
            <>
              <ProductList products={filteredProducts} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          ) : (
            <p className="empty-message">No products found in this category.</p>
          )}
        </div>
      )}
    </div>
  );

};

export default CategoryProductsPage;
