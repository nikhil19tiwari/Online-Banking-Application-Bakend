import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { login } from "../services/user-service";
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

function LoginPage() {
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const navigate = useNavigate(); // For navigation

  const resetdata = () => {
    setdata({
      email: "",
      password: "",
    });
  };

  const submitForm = (event) => {
    event.preventDefault();

    // Call server API
    login(data)
      .then((resp) => {
        console.log("Response:", resp);

        // Navigate based on the response
        if (resp === "yes") {
          // Redirect to dashboard or another page
          navigate("/dashboard");
        } else if (resp === "no") {
          // Redirect to signup page
          navigate("/signup");
        } else {
          console.error("Unexpected response:", resp);
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        setError({ ...error, isError: true });
      });
  };

  // Handle change
  const handleChange = (event, property) => {
    setdata({ ...data, [property]: event.target.value });
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" inverse>
            <CardHeader style={{ textAlign: "center" }}>
              <h2>Fill Login Form !!</h2>
            </CardHeader>
            <CardBody>
              <Form onSubmit={submitForm}>
                <FormGroup>
                  <Label for="email">Enter email here</Label>
                  <Input
                    type="email"
                    placeholder="Enter here"
                    id="email"
                    onChange={(e) => handleChange(e, "email")}
                    value={data.email}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Enter password</Label>
                  <Input
                    type="password"
                    placeholder="Enter here"
                    id="password"
                    onChange={(e) => handleChange(e, "password")}
                    value={data.password}
                  />
                </FormGroup>
                <Container className="text-center">
                  <Button color="primary">Submit</Button>
                  <Button
                    onClick={resetdata}
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

export default LoginPage;
