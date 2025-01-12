import { useState } from "react";
import { withdrawamount } from "../services/user-service";
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

function Withdraw() {
  const [data, setData] = useState({
    email: "",
    accountType: "",
    accountNumber: "",
    amount: "",
   
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const resetData = () => {
    setData({
      email: "",
      accountType: "",
      accountNumber: "",
      amount: "",
    });
  };

  const navigate = useNavigate();

  const submitForm = (event) => {
    event.preventDefault();

    withdrawamount(data)
      .then((resp) => {
        console.log("API Response:", resp);
        navigate("/WithdrawSuccess", { state: { response: resp } });
      })
      .catch((error) => {
        console.error("Error occurred:", error.response?.data || error);
        setError({
          errors: error.response?.data || { message: "Something went wrong" },
          isError: true,
        });
      });
  };

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(to right,rgb(187, 82, 191),rgb(39, 185, 95))",
        height: 700,
      }}
    >
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="primary" inverse>
              <CardHeader style={{ textAlign: "center" }}>
                <h2>Withdraw Form !!</h2>
              </CardHeader>
              <CardBody>
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label for="email">Enter Email ID</Label>
                    <Input
                      type="email"
                      placeholder="Enter here"
                      id="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="accountType">Select Account Type</Label>
                    <Input
                      type="select"
                      id="accountType"
                      onChange={(e) => handleChange(e, "accountType")}
                      value={data.accountType}
                    >
                      <option value="">Select Account Type</option>
                      <option value="Saving">Saving</option>
                      <option value="Current">Current</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="accountNumber">Enter Account Number</Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      id="accountNumber"
                      onChange={(e) => handleChange(e, "accountNumber")}
                      value={data.accountNumber}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="amount">Enter Amount</Label>
                    <Input
                      type="number"
                      placeholder="Enter here"
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

export default Withdraw;
