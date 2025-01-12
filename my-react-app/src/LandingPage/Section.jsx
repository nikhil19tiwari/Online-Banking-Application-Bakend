import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
function Section() {
  const navigate = useNavigate();
  const handleAccount = () => {
    console.log("Deposit button clicked");
    navigate("/login");
  };
  return (
    <section style={styles.heroSection}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Welcome to Our Platform</h1>
        <p style={styles.description}>Your journey to explore services starts here!</p>
        <div style={styles.buttonContainer}>
          <button style={{ ...styles.button, ...styles.openAccount }}
          onClick={handleAccount}
          >
            Open Account
          </button>
          <button style={{ ...styles.button, ...styles.exploreServices }}
          onClick={handleAccount}
          >
            Explore Services
          </button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  heroSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh", // Full viewport height
    background: "linear-gradient(to right, #4facfe,rgb(209, 62, 222))",
    color: "white",
    textAlign: "center",
  },
  content: {
    maxWidth: "800px",
    padding: "20px",
  },
  heading: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
  },
  buttonContainer: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  openAccount: {
    backgroundColor: "#ff7f50",
    color: "white",
  },
  exploreServices: {
    backgroundColor: "#32cd32",
    color: "white",
  },
};

export default Section;
