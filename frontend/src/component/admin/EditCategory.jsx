import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../style/addProduct.css";
import ApiService from "../../service/ApiService";

const EditProductPage = () => {
  const { productId } = useParams();
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ fetch categories
    ApiService.getAllCategory().then((res) =>
      setCategories(res.categoryList)
    );

    // ✅ fetch product details
    if (productId) {
      ApiService.getProductById(productId).then((response) => {
        setName(response.product.name || "");
        setDescription(response.product.description || "");
        setPrice(response.product.price ?? ""); // ensure string
        setCategoryId(response.product.category?.id || ""); // category id comes from nested object
        setImageUrl(response.product.imageUrl || null);
      });
    }
  }, [productId]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      if (productId) formData.append("productId", productId);
      if (categoryId) formData.append("categoryId", categoryId);
      if (image) formData.append("image", image);
      if (name) formData.append("name", name);
      if (description) formData.append("description", description);

      // ✅ parse price safely
      if (price !== "" && !isNaN(price)) {
        formData.append("price", parseFloat(price));
      }

      const response = await ApiService.updateProduct(formData);

      if (response.status === 200) {
        setMessage(response.message || "Product updated successfully");
        setTimeout(() => {
          setMessage("");
          navigate("/admin/products");
        }, 2000);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || error.message || "Unable to update product"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Edit Product</h2>
      {message && <div className="message">{message}</div>}

      <input type="file" onChange={handleImageChange} />
      {imageUrl && <img src={imageUrl} alt={name} />}

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option value={cat.id} key={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        step="0.01"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button type="submit">Update</button>
    </form>
  );
};

export default EditProductPage;
