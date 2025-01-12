import { useState } from "react";
import { transferMoney } from "../services/user-service"; // Corrected typo
import { useNavigate } from "react-router-dom"; // For navigation
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

function UserTransfer() {
  const [data, setData] = useState({
    senderUserName: "",
    senderAccountType: "",
    receiverAccountNumber: "",
    amount: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const navigate = useNavigate();

  // Reset form data
  const resetData = () => {
    setData({
      senderUserName: "",
      senderAccountType: "",
      receiverAccountNumber: "",
      amount: "",
    });
    setError({
      errors: {},
      isError: false,
    });
  };

  // Handle form submission
  const submitForm = (event) => {
    event.preventDefault(); 

    // API call
    transferMoney(data)
      .then((resp) => {
        console.log("API Response:", resp);
        navigate("/TranferSuccess", { state: { response: resp } });
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        const errorMessage =
          error?.response?.data?.message || "Something went wrong";
        setError({
          errors: { message: errorMessage },
          isError: true,
        });
      });
  };

  // Handle input changes
  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(to right, rgb(215, 245, 86), rgb(173, 126, 240))",
        height: "100vh",
      }}
    >
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="primary" inverse>
              <CardHeader style={{ textAlign: "center" }}>
                <h2>!! Transfer Money Form !!</h2>
              </CardHeader>
              <CardBody>
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label for="senderUserName">Enter Sender's User Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter sender's name"
                      id="senderUserName"
                      onChange={(e) => handleChange(e, "senderUserName")}
                      value={data.senderUserName}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="senderAccountType">Select Sender Account Type</Label>
                    <Input
                      type="select"
                      id="senderAccountType"
                      onChange={(e) => handleChange(e, "senderAccountType")}
                      value={data.senderAccountType}
                    >
                      <option value="">Select Account Type</option>
                      <option value="Saving">Saving</option>
                      <option value="Current">Current</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="receiverAccountNumber">
                      Enter Receiver Account Number
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter receiver's account number"
                      id="receiverAccountNumber"
                      onChange={(e) => handleChange(e, "receiverAccountNumber")}
                      value={data.receiverAccountNumber}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="amount">Enter Transfer Amount</Label>
                    <Input
                      type="number"
                      placeholder="Enter transfer amount"
                      id="amount"
                      onChange={(e) => handleChange(e, "amount")}
                      value={data.amount}
                    />
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="warning" type="submit">
                      Submit
                    </Button>
                    <Button
                      onClick={resetData}
                      color="danger"
                      type="reset"
                      className="ms-2"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
                {error.isError && (
                  <div className="alert alert-danger mt-3">
                    {Object.values(error.errors).map((err, index) => (
                      <p key={index}>{err}</p>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserTransfer;
