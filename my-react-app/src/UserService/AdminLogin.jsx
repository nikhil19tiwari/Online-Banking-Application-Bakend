import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { adminLoginData } from "../services/user-service"; // Import API service

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { username, email, password };

    try {
      const response = await adminLoginData(loginData); // Send data to the backend
      console.log("Backend Response:", response); // Debugging: Log the response

      if (response === "success") {
        // Show success toast
        toast.success("Login successful! Redirecting to OTP verification...", {
          position: "top-right",
          autoClose: 2000,
        });

        // Redirect to OTP verification after a short delay
        setTimeout(() => {
          navigate("/varify"); // Redirect to the OTP verification page
        }, 2000);
      } else {
        // Show error toast for invalid credentials
        toast.error("Invalid credentials. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      // Handle and log unexpected errors
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Admin Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Username Field */}
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
            style={styles.input}
          />
        </div>

        {/* Email Field */}
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={styles.input}
          />
        </div>

        {/* Password Field */}
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={styles.input}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      {/* Toastify Container */}
      <ToastContainer />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f9",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    marginBottom: "20px",
    color: "#4CAF50",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "10px 20px",
    fontSize: "16px", 
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default AdminLogin;
