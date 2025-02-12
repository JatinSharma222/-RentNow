import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  
  const [status, setStatus] = React.useState({
    loading: false,
    message: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ loading: true, message: "Logging you in..." });
    
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 404) {
        setStatus({ loading: false, message: "User not found" });
      } else if (response.status === 401) {
        setStatus({ loading: false, message: "Invalid credentials" });
      } else if (!response.ok) {
        throw new Error(data.message || "Network response was not ok");
      } else {
        setStatus({ loading: true, message: "Login successful! Redirecting..." });
        
        // Update auth context immediately after successful login
        await login(data.user);
        
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus({ loading: false, message: error.message || "An unexpected error occurred." });
    }
  }

  return (
    <div id="login-form-container">
      <div id="login-form-header"><Link to="/login">Login</Link></div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <button 
          className="form-button" 
          type="submit"
          disabled={status.loading}
        >
          {status.loading ? "Logging in..." : "Login"}
        </button>

        {status.message && (
          <div className={`status-message ${status.loading ? "loading" : "error"}`}>
            {status.message}
          </div>
        )}
      </form>
      <div id="login-form-footer"><Link to="/register">New user register here</Link></div>
    </div>
  );
}