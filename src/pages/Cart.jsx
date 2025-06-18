// src/components/Cart.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/getCartItems/${username}`
      );
      if (!res.ok) throw new Error("Failed to fetch cart");
      setItems(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  if (loading) return <p>Loading cart...</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <>
      <h3>{username}’s Cart</h3>
      <button onClick={() => navigate("/customer_home")}>
        ← Back to Products
      </button>

      <table border="1" cellPadding="10" cellSpacing="0" style={{ marginTop: 16 }}>
        <thead>
          <tr>
            <th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.productId}>
              <td>{item.name}</td>
              <td>₹{item.price}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price * item.quantity}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3"><strong>Total</strong></td>
            <td><strong>₹{total}</strong></td>
          </tr>
        </tbody>
      </table>

      <button
        style={{ marginTop: 16 }}
        onClick={() => {
          // stub: integrate your payment flow here
          alert(`Proceeding to payment of ₹${total}`);
          navigate("/payment");
        }}
      >
        Pay ₹{total}
      </button>
    </>
  );
}
