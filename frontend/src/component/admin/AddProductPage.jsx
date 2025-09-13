import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/addProduct.css";
import ApiService from "../../service/ApiService";

const AddProductPage = () => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getAllCategory().then((res) => setCategories(res.categoryList));
  }, []);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (image) formData.append("image", image);
      if (categoryId) formData.append("categoryId", categoryId);
      if (name) formData.append("name", name);
      if (description) formData.append("description", description);

      // ✅ ensure price is numeric before sending
      if (price !== "" && !isNaN(price)) {
        formData.append("price", parseFloat(price));
      }

      const response = await ApiService.addProduct(formData);
      if (response.status === 200) {
        setMessage(response.message || "Product added successfully");
        setTimeout(() => {
          setMessage("");
          navigate("/admin/products");
        }, 2000);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || error.message || "Unable to upload product"
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="product-form">
        <h2>Add Product</h2>
        {message && <div className="message">{message}</div>}

        <input type="file" onChange={handleImage} />

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

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
