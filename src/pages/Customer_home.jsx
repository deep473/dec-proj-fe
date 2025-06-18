// src/components/Customer_home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Customer_home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/getAllProducts");
      if (!res.ok) throw new Error("Failed to fetch products");
      setProducts(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("Please sign in first!");
      return;
    }

    try {
      const resp = await fetch("http://localhost:8080/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/plain"
        },
        body: JSON.stringify({ username, productId })
      });
      const msg = await resp.text();
      if (resp.ok && msg === "success") {
        alert("Added to cart!");
      } else {
        alert("Cart error: " + msg);
      }
    } catch (err) {
      console.error(err);
      alert("Could not add to cart.");
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <>
      <h3>Welcome, {localStorage.getItem("username")}</h3>
      <button
        type="button"
        onClick={() => navigate("/cart")}
        style={{ marginBottom: 16 }}
      >
        Go to Cart
      </button>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Description</th>
            <th>Price</th><th>Photo</th><th>Category</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>₹{p.price}</td>
              <td>
                <img src={p.photo} alt={p.name} width="100" height="80" />
              </td>
              <td>{p.category}</td>
              <td>
                <button onClick={() => handleAddToCart(p.id)}>
                  Add to cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
