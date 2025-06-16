import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateProduct() {
  const { state: product } = useLocation();
  const navigate = useNavigate();

  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/updateProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      const msg = await res.text();
      alert(msg);
      navigate("/showProducts");
    } catch (error) {
      alert("Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Product</h2>
      <label>ID (read-only): <input value={updatedProduct.id} readOnly /></label><br />
      <label>Name: <input name="name" value={updatedProduct.name} onChange={handleChange} /></label><br />
      <label>Description: <input name="description" value={updatedProduct.description} onChange={handleChange} /></label><br />
      <label>Price: <input name="price" value={updatedProduct.price} onChange={handleChange} /></label><br />
      <label>Photo URL: <input name="photo" value={updatedProduct.photo} onChange={handleChange} /></label><br />
      <label>Category: <input name="category" value={updatedProduct.category} onChange={handleChange} /></label><br />
      <button type="submit">Update</button>
    </form>
  );
}
