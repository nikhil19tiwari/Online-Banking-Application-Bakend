import React from "react";
import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // FontAwesome Icons
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure Bootstrap is included for styling

function Footer() {
  return (

     
    
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.socialIcons}>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
              <FaLinkedin style={styles.icon} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
              <FaFacebook style={styles.icon} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
              <FaTwitter style={styles.icon} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
              <FaInstagram style={styles.icon} />
            </a>
          </div>
          <p style={styles.copyText}>© 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    
    
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", // Ensures the wrapper takes up the full height of the viewport
  },
  content: {
    flex: 1, // This makes sure content takes up the available space and pushes the footer to the bottom
    padding: "20px",
  },
  footer: {
    backgroundColor: "#333",
    color: "white",
    padding: "20px 0",
    textAlign: "center",
    width: "100%",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "10px",
  },
  iconLink: {
    color: "white",
    fontSize: "2rem",
    transition: "color 0.3s ease",
  },
  icon: {
    cursor: "pointer",
  },
  copyText: {
    fontSize: "1rem",
    color: "#ccc",
  },
};

export default Footer;
