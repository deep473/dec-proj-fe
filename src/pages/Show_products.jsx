import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Show_products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/getAllProducts");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch("http://localhost:8080/deleteProduct", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ id }),
      });
      const msg = await res.text();
      alert(msg);
      fetchAllProducts(); // refresh list
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  const handleUpdate = (product) => {
    // navigate to update component with state
    navigate("/updateProduct", { state: product });
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <table border="1" cellPadding="10" cellSpacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Photo</th>
          <th>Category</th>
          <th>More operations</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>₹{product.price}</td>
            <td>
              <img src={product.photo} alt={product.name} width="100" height="80" />
            </td>
            <td>{product.category}</td>
            <td>
              <button onClick={() => handleUpdate(product)}>Update</button>
              &nbsp;
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
