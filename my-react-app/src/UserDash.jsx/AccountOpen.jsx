import { useState } from "react";
import { accountopen } from "../services/user-service";
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

function AccountOpen() {
  const [data, setData] = useState({
   
    userName: "",
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    accountType: "",
    emailId: "",
    aadhar: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const resetData = () => {
    setData({
      userName: "",
      firstName: "",
      lastName: "",
      gender: "",
      address: "",
      accountType: "",
      emailId: "",
      aadhar: "",
    });
  };
  const navigate = useNavigate();

  const submitForm = (event) => {
    event.preventDefault();
  
    accountopen(data)
      .then((resp) => {
        console.log("API Response:", resp); // Debugging: Check the response
        navigate("/OpenSuccess", { state: { response: resp } });
      })
      .catch((error) => {
        console.error("Error occurred!!", error);
      });
  };
  

  // Handle change
  const handleChange = (event, property) => {
    // Dynamically change the value
    setData({ ...data, [property]: event.target.value });
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" inverse>
            <CardHeader style={{ textAlign: "center" }}>
              <h2>Account Open Form !!</h2>
            </CardHeader>
            <CardBody>
              <Form onSubmit={submitForm}>
                <FormGroup>
                  <Label for="userName">Enter User Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter here"
                    id="userName"
                    onChange={(e) => handleChange(e, "userName")}
                    value={data.userName}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="firstName">Enter First Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter here"
                    id="firstName"
                    onChange={(e) => handleChange(e, "firstName")}
                    value={data.firstName}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="lastName">Enter Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter here"
                    id="lastName"
                    onChange={(e) => handleChange(e, "lastName")}
                    value={data.lastName}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="gender">Select Gender</Label>
                  <Input
                    type="select"
                    id="gender"
                    onChange={(e) => handleChange(e, "gender")}
                    value={data.gender}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="address">Enter Address</Label>
                  <Input
                    type="text"
                    placeholder="Enter here"
                    id="address"
                    onChange={(e) => handleChange(e, "address")}
                    value={data.address}
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
                  <Label for="emailId">Enter Email ID</Label>
                  <Input
                    type="email"
                    placeholder="Enter here"
                    id="emailId"
                    onChange={(e) => handleChange(e, "emailId")}
                    value={data.emailId}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="aadhar">Enter Aadhar Number</Label>
                  <Input
                    type="text"
                    placeholder="Enter here"
                    id="aadhar"
                    onChange={(e) => handleChange(e, "aadhar")}
                    value={data.aadhar}
                  />
                </FormGroup>
                <Container className="text-center">
                  <Button color="primary">Submit</Button>
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
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AccountOpen;
