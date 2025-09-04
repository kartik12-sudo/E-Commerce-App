// src/App.js

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute, AdminRoute } from './service/Guard';
import Navbar from './component/common/Navbar';
import Footer from './component/common/footer';
import { CartProvider } from './component/context/CartContext';
import { ToastContainer } from "react-toastify";   // ✅ added
import "react-toastify/dist/ReactToastify.css";    // ✅ include CSS once globally

import Home from './component/pages/Home';
import ProductDetailsPage from './component/pages/ProductDetailsPage';
import CategoryListPage from './component/pages/CategoryListPage';
import CategoryProductsPage from './component/pages/CategoryProductsPage';
import CartPage from './component/pages/CartPage';
import RegisterPage from './component/pages/RegisterPage';
import LoginPage from './component/pages/LoginPage';
import ProfilePage from './component/pages/ProfilePage';
import AddressPage from './component/pages/AddressPage';
import OtpPage from './component/pages/OtpPage';

import AdminPage from './component/admin/AdminPage';
import AdminCategoryPage from './component/admin/AdminCategoryPage';
import AddCategory from './component/admin/AddCategory';
import EditCategory from './component/admin/EditCategory';
import AdminProductPage from './component/admin/AdminProductPage';
import AddProductPage from './component/admin/AddProductPage';
import EditProductPage from './component/admin/EditProductPage';
import AdminOrdersPage from './component/admin/AdminOrderPage';
import AdminOrderDetailsPage from './component/admin/AdminOrderDetailsPage';
import ShopPage from './component/pages/ShopPage';

import AboutPage from './component/pages/AboutPage';
import BlogPage from './component/pages/BlogPage';
// -- BlogDetailsPage import has been removed --

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/categories" element={<CategoryListPage />} />
          <Route path="/category/:categoryId" element={<CategoryProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected User Routes */}
          <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
          <Route path="/add-address" element={<ProtectedRoute element={<AddressPage />} />} />
          <Route path="/edit-address" element={<ProtectedRoute element={<AddressPage />} />} />
          
          <Route path="/shop" element={<ShopPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute element={<AdminPage />} />} />
          <Route path="/admin/categories" element={<AdminRoute element={<AdminCategoryPage />} />} />
          <Route path="/admin/add-category" element={<AdminRoute element={<AddCategory />} />} />
          <Route path="/admin/edit-category/:categoryId" element={<AdminRoute element={<EditCategory />} />} />
          <Route path="/admin/products" element={<AdminRoute element={<AdminProductPage />} />} />
          <Route path="/admin/add-product" element={<AdminRoute element={<AddProductPage />} />} />
          <Route path="/admin/edit-product/:productId" element={<AdminRoute element={<EditProductPage />} />} />
          <Route path="/admin/orders" element={<AdminRoute element={<AdminOrdersPage />} />} />
          <Route path="/admin/order-details/:itemId" element={<AdminRoute element={<AdminOrderDetailsPage />} />} />

          {/* Static Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>

        <Footer />
        {/* ✅ Global Toast container so toasts work across all pages */}
        <ToastContainer position="top-center" autoClose={3000} />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
