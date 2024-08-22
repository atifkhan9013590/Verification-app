import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { toast } from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please provide both email and password.");
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    try {
      // Use the environment variable for the base URL
      const apiUrl = process.env.REACT_APP_API_BASE_URL;

      const response = await axios.post(`${apiUrl}/admin/Login`, {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      localStorage.setItem("token", response.data.token);

      toast.success("Login Successfully");
      navigate("/AddNewEntry");
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <p className="pp">LOGIN</p>

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
      <div className="last-div-line">
        <p>Traffic Police of Pakistan</p>
      </div>
    </div>
  );
}

export default Login;
