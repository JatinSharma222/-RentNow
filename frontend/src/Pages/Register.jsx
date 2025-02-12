import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
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
    
    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setStatus({ loading: false, message: "Passwords do not match" });
      return;
    }

    setStatus({ loading: true, message: "Creating your account..." });
    
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password
        }),
      });

      if (response.status === 409) {
        const data = await response.json();
        setStatus({ loading: false, message: data.message });
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const data = await response.json();
        console.log("Success:", data);
        setStatus({ loading: true, message: "Registration successful! Redirecting to login..." });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus({ loading: false, message: "An unexpected error occurred." });
    }
  }

  return (
    <div id="register-form-container">
      <div id="register-form-header">
        <Link to="/register">Register</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          value={formData.phone}
          required
        />
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
          placeholder="Set Password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={formData.confirmPassword}
          required
        />
        <button 
          className="form-button" 
          type="submit"
          disabled={status.loading}
        >
          {status.loading ? "Creating Account..." : "Register"}
        </button>

        {status.message && (
          <div className={`status-message ${status.loading ? "loading" : "error"}`}>
            {status.message}
          </div>
        )}
      </form>
      <div id="register-form-footer">
        <Link to="/login">Already have an account? Login here</Link>
      </div>
    </div>
  );
}