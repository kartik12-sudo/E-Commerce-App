import React from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../common/ProductList";

const SearchResultsPage = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      {results.length > 0 ? (
        <ProductList products={results} />
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
