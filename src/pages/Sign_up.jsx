import React, { useState } from "react";

export default function Sign_up() {
  
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender]     = useState("");
  const [dob, setDob]           = useState("");
  const [role, setRole]         = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const data = { username, email, password, gender, dob, role };

    try {
      const resp = await fetch("http://localhost:8080/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      alert(await resp.text());
    } catch (err) {
      console.error(err);
      alert("Failed to sign up");
    }
  }

  return (
    <div>
      <h4>Sign up below</h4>

      <form onSubmit={handleSubmit}>
    
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br></br><br></br>
     
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
         <br></br><br></br>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br><br></br>
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select…</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
          <br></br><br></br>
          <label htmlFor="dob">Date of birth</label>
          <input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
      

          <br></br><br></br>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select…</option>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
       
          <br></br><br></br>
        <button type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}