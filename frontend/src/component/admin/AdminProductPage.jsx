import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/adminProduct.css";
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";
import ConfirmationModal from './ConfirmationModel'; // Import the new component

const AdminProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await ApiService.getAllProducts();
      const productList = response.productList || [];
      setTotalPages(Math.ceil(productList.length / itemsPerPage));
      setProducts(
        productList.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.message ||
        "Unable to fetch products"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  // Open delete confirmation modal
  const openDeleteModal = (id) => {
    setProductToDelete(id);
    setIsModalOpen(true);
  };

  // Confirm deletion
  const handleDeleteConfirm = async () => {
    try {
      await ApiService.deleteProduct(productToDelete);
      fetchProducts(); // Refresh products after deletion
      setIsModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.message ||
        "Unable to delete product"
      );
      setIsModalOpen(false);
      setProductToDelete(null);
    }
  };

  // Cancel deletion
  const handleDeleteCancel = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className="admin-product-list">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div>
          <h2>Products</h2>

          <button
            className="add-product-btn"
            onClick={() => navigate("/admin/add-product")}
          >
            Add Product
          </button>

          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <span>{product.name}</span>
                <div className="button-group">
                  <button
                    className="product-btn"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="product-btn-delete"
                    onClick={() => openDeleteModal(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this product?"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default AdminProductPage;