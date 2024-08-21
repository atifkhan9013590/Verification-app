import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

 
    const dummyEmail = "user@example.com";
    const dummyPassword = "password123";

   
    if (email === dummyEmail && password === dummyPassword) {
      setError(""); 
      navigate("/AddNewEntry");  
    } else {
      setError("Incorrect email or password"); // Show error message
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <p className="pp">LOGIN</p>
        {error && <p className="error">{error}</p>} {/* Show error if any */}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      
      </div>
    </div>
  );
}

export default Login;
