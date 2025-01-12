import { useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";

function UserSuccess() {
  const location = useLocation();
  const { response } = location.state || {}; // Get the response from navigation state

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 6, offset: 3 }}>
          <Card className="shadow-lg" style={{ borderRadius: "15px" }}>
            <CardHeader
              style={{
                textAlign: "center",
                background:
                  "linear-gradient(90deg,rgb(163, 253, 143),rgb(190, 242, 252))",
                color: "#fff",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
            >
              <h2 style={{ fontWeight: "bold" }}>🎉 Amount Withdraw!</h2>
            </CardHeader>
            <CardBody style={{ background: "#f9f9f9", padding: "30px" }}>
              {response ? (
                <div style={{ textAlign: "center" }}>
                  <h4 style={{ color: "#4CAF50", fontWeight: "bold" }}>
                    Congratulations!
                  </h4>
                  <p>Your Amount has been successfully Withdrawl.</p>
                  <div
                    style={{
                      border: "1px solid #e0e0e0",
                      borderRadius: "10px",
                      padding: "20px",
                      background: "#fff",
                      marginTop: "20px",
                    }}
                  >
                    <p>
                      <strong>User Name:</strong> {response[8]}
                    </p>
                    <p>
                      <strong>First Name:</strong> {response[7]}
                    </p>
                    <p>
                      <strong>Last Name:</strong> {response[6]}
                    </p>
                    <p>
                      <strong>Account Number:</strong> {response[0]}
                    </p>
                    <p>
                      <strong>Email Id :</strong> {response[3]}
                    </p>
                    <p>
                      <strong>Address:</strong> {response[4]}
                    </p>
                    <p>
                      <strong>Gender:</strong> {response[5]}
                    </p>
                    <p>
                      <strong>Account Balance:</strong> ₹{response[9]}
                    </p>
                    <p>
                      <strong>Account Type:</strong>{" "}
                      <span style={{ color: "#1c92d2", fontWeight: "bold" }}>
                        {response[1]}
                      </span>
                    </p>
                    <p>
                      <strong>Aadhar Number:</strong> {response[2]}
                    </p>
                  </div>
                  <Button
                    color="primary"
                    style={{
                      marginTop: "20px",
                      borderRadius: "50px",
                      padding: "10px 20px",
                    }}
                    onClick={() => (window.location.href = "/dashboard")}
                  >
                    Go to Dashboard
                  </Button>
                </div>
              ) : (
                <p
                  style={{
                    textAlign: "center",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  No response received from the server!
                </p>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserSuccess;
