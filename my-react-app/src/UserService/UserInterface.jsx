import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
} from "reactstrap";

function UserInterface() {
  // Handlers for different button actions

  const navigate = useNavigate(); // For navigation

  const handleAccountOpen = () => {
    console.log("Account Open button clicked");
    navigate("/AccountOpen");
  };

  const handleDeposit = () => {
    console.log("Deposit button clicked");
    navigate("/deposit");
  };

  const handleWithdraw = () => {
    console.log("Withdraw button clicked");
    navigate("/withdraw");
  };

  const handleTransaction = () => {
    console.log("Transaction button clicked");
    navigate("/transfer");
  };

  const handleProfile = () => {
    console.log("Profile button clicked");
    navigate("/profile");
  };

  const handleHistory = () => {
    console.log("History button clicked");
    navigate("/page");
  };

  const handleLogout = () => {
    console.log("Logout button clicked");
    navigate("/login");
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(to right,rgb(245, 245, 119), rgb(246, 84, 238))",
        height: "100vh", // full viewport height
        display: "flex", // use flexbox to center content
        alignItems: "center", // vertically center
        justifyContent: "center", // horizontally center
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col sm={{ size: 8 }}>
            <Card className="shadow">
              <CardHeader
                className="bg-dark text-white text-center"
                style={{ fontSize: "1.5rem" }}
              >
                ! Welcome to User Interface !
              </CardHeader>
              <CardBody>
                <Row className="text-center">
                  <Col md={6} className="mb-3">
                    <Button
                      color="primary"
                      size="lg"
                      className="w-100"
                      onClick={handleAccountOpen}
                    >
                      Account Open
                    </Button>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Button
                      color="success"
                      size="lg"
                      className="w-100"
                      onClick={handleDeposit}
                    >
                      Deposit
                    </Button>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Button
                      color="warning"
                      size="lg"
                      className="w-100"
                      onClick={handleWithdraw}
                    >
                      Withdraw
                    </Button>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Button
                      color="info"
                      size="lg"
                      className="w-100"
                      onClick={handleTransaction}
                    >
                      Transaction
                    </Button>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Button
                      color="secondary"
                      size="lg"
                      className="w-100"
                      onClick={handleProfile}
                    >
                      Profile
                    </Button>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Button
                      color="dark"
                      size="lg"
                      className="w-100"
                      onClick={handleHistory}
                    >
                      History
                    </Button>
                  </Col>
                  <Col md={12} className="mt-4">
                    <Button
                      color="danger"
                      size="lg"
                      className="w-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserInterface;
