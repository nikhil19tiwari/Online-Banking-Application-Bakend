import { useState } from "react";
import { signup } from "../services/user-service";
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

function SignUpPage() {
  const [data, setdata] = useState({
    username: "",
      email: "",
      phone: "",
      password:'',
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const resetdata = () => {
    setData({

      username: "",
      email: "",
      phone: "",
      password:'',
    });
  };
  const navigate = useNavigate();

  const submitForm = (event) => {
    event.preventDefault();

    //validation the data

    // call server Api
    signup(data)
      .then((resp) => {
        console.log(resp);
        console.log("success response");
       navigate("/dashboard")
      })
      .catch((error) => {
        console.log(error);
        console.log("error is occured!!");
      });
  };

  // handle change
  const handleChange = (event, property) => {
    //dynamic change the value
    setdata({ ...data, [property]: event.target.value });
  };
  return (
    <Container>
      <Row className="mt-4">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" inverse>
            <CardHeader style={{ textAlign: "center" }}>
              <h2>Fill Signup Form !!</h2>
            </CardHeader>
            <CardBody>
              <Form onSubmit={submitForm}>
                <FormGroup>
                  <Label for="username">Enter user name</Label>
                  <Input
                    type="text"
                    placeholder="Enter here"
                    id="username"
                    onChange={(e) => handleChange(e, "username")}
                    value={data.username}
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
                  <Label for="phone">Enter phone number here</Label>
                  <Input
                    type="text"
                    placeholder="Enter here"
                    id="phone"
                    onChange={(e) => handleChange(e, "phone")}
                    value={data.phone}
                  ></Input>
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
export default SignUpPage;
