import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sign_in() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = { username, password };

    try {
      const resp = await fetch("http://localhost:8080/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "text/plain" 
      },
      body: JSON.stringify(data),
    });


      const msg = await resp.text(); 

      if (msg === "admin" || msg === "customer") {
        localStorage.setItem("username", username); 
        navigate(`/${msg}_home`);
      } else {
        alert(msg); 
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Could not sign in");
    }
  }

  return (
    <>
      <h4 >Sign in</h4>

      <form onSubmit={handleSubmit}>
        
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
       

        <button className="btn btn-primary w-100" type="submit">
          Log in
        </button>
      </form>
   </>
  );
}