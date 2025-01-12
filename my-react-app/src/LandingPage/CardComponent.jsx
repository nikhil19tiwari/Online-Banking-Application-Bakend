import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Button, Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom"; // NavLink for navigation

function CardComponent() {
  // Sample card data
  const cardData = [
    { id: 1, title: "OPEN ACCOUNT", image: "/images/open.jpeg", text: "Open your account", link: "/AccountOpen" },
    { id: 2, title: "TRANSFER", image: "/images/tr.png", text: "Transfer your money", link: "/login" },
    { id: 3, title: "DEPOSIT AMOUNT", image: "/images/de.png", text: "Deposit your amount", link: "/login" },
    { id: 4, title: "WITHDRAW AMOUNT", image: "/images/wi.jpeg", text: "Withdraw your amount", link: "/login" },
    { id: 5, title: "CHECK HISTORY", image: "/images/his.png", text: "Check your history", link: "/login" },
    { id: 6, title: "CHECK PROFILE", image: "/images/pro.jpeg", text: "Check your profile", link: "/profile" },
  ];

  return (
    <Row style={styles.row}>
      {cardData.map((card) => (
        <Col key={card.id} sm="12" md="6" lg="4">
          <Card style={styles.card}>
            <CardImg top width="100%" src={card.image} alt={card.title} style={styles.image} />
            <CardBody>
              <CardTitle tag="h5" style={styles.cardTitle}>
                {card.title}
              </CardTitle>
              <CardText style={styles.cardText}>{card.text}</CardText>
              <NavLink to={card.link} style={styles.navLink}>
                <Button style={styles.button}>Go to {card.title}</Button>
              </NavLink>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

const styles = {
  row: {
    padding: "20px",
  },
  card: {
    margin: "10px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  image: {
    height: "150px",
    objectFit: "cover",
  },
  cardTitle: {
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "10px",
  },
  cardText: {
    color: "#555",
    fontSize: "14px",
    textAlign: "center",
    marginBottom: "15px",
  },
  navLink: {
    textDecoration: "none",
    display: "block",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default CardComponent;
