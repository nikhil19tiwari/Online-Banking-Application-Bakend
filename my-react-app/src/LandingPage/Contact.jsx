import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is installed

function Contact() {
  return (
    <div style={{ 
        background: "linear-gradient(to right,rgb(150, 230, 88),rgb(215, 164, 70))",}}>
    <div style={styles.container }
    >
      <h2 style={styles.heading} >Contact Us !!</h2>
      
      <Form style={styles.form} >
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            required
            style={styles.input}
          />
        </FormGroup>
        <FormGroup>
          <Label for="subject">Subject</Label>
          <Input
            type="text"
            name="subject"
            id="subject"
            placeholder="Enter the subject"
            required
            style={styles.input}
          />
        </FormGroup>
        <FormGroup>
          <Label for="message">Message</Label>
          <Input
            type="textarea"
            name="message"
            id="message"
            placeholder="Enter your message"
            required
            style={styles.textarea}
          />
        </FormGroup>
        <Button color="primary" type="submit" style={styles.button}>
          Submit
        </Button>
      </Form>
    </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#f9f9f9",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minHeight: "100px",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
};

export default Contact;
