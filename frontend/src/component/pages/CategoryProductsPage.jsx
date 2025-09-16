import React, { useState, useEffect, useCallback } from "react";
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
  const itemsPerPage = 8;

  // ✅ Wrap fetchProducts in useCallback
  const fetchProducts = useCallback(async () => {
    try {
      setError(null); // clear old errors
      const response = await ApiService.getAllProductsByCategoryId(categoryId);

      // Defensive: ensure productList exists
      const allProducts = Array.isArray(response.productList)
        ? response.productList
        : [];

      setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
      setProducts(
        allProducts.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );
    } catch (error) {
      setProducts([]); // clear old products
      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch products by category"
      );
    }
  }, [categoryId, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // now safe and warning-free

  // ✅ Apply filter client-side
  const filteredProducts = products.filter(
    (p) => !priceFilter || p.price <= Number(priceFilter)
  );

  return (
    <div className="home">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div>
          {/* Price Filter Bar */}
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