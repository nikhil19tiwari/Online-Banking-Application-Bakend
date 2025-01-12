import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminVarify } from "../services/user-service"; // Import your service function

function VarifyOtp() {
  const [otp, setOtp] = useState(""); // State to store the OTP input
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // To navigate after verification

  // Handle OTP submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!otp.trim()) {
      toast.error("OTP cannot be empty!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setLoading(true); // Set loading to true
      const response = await adminVarify(otp); // Call the backend

      if (response === "success") {
        toast.success("OTP verified successfully! Redirecting to the dashboard...", {
          position: "top-right",
          autoClose: 2000,
        });

        // Redirect to the admin dashboard after a short delay
        setTimeout(() => {
          navigate("/admindashboard"); // Ensure this route exists in your application
        }, 2000);
      } else {
        toast.error("Invalid OTP. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error("An error occurred while verifying OTP. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>OTP Verification</h2>
      <p style={styles.instructions}>Enter the OTP sent to your email/phone to proceed.</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="otp" style={styles.label}>
            OTP:
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            style={styles.input}
            maxLength="6" // Optional: Limit OTP length
          />
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
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
    fontSize: "24px",
  },
  instructions: {
    marginBottom: "20px",
    fontSize: "14px",
    color: "#555",
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

export default VarifyOtp;
