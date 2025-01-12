import { useState } from "react";
import { checkUserProfile } from "../services/user-service";
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

function UserProfile() {
  const [data, setData] = useState({
    accountType: "",
    accountNumber: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const resetData = () => {
    setData({
      accountType: "",
      accountNumber: "",
    });
    setError({
      errors: {},
      isError: false,
    });
  };

  const navigate = useNavigate();

  const submitForm = (event) => {
    event.preventDefault();

    // Validation check for empty accountType
    if (!data.accountType) {
      setError({
        errors: { accountType: "Please select an account type." },
        isError: true,
      });
      return;
    }

    const payload = {
      ...data,
      accountType: data.accountType.toUpperCase(), // Normalize case for API compatibility
    };

    checkUserProfile(payload)
      .then((resp) => {
        console.log("API Response:", resp);
        navigate("/userPro", { state: { response: resp } });
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
  <h2>Check User Profile !!</h2>
  <img
    src="/images/admin.png" // Replace this URL with the path to your logo
    alt="Logo"
    style={{
      width: "80px", // Set the desired width of the logo
      height: "80px", // Set the desired height of the logo
      marginTop: "10px", // Add some spacing between the heading and logo
    }}
  />
</CardHeader>

              <CardBody>
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label for="accountType">Select Account Type</Label>
                    <Input
                      type="select"
                      id="accountType"
                      onChange={(e) => handleChange(e, "accountType")}
                      value={data.accountType}
                    >
                      <option value="">Select Account Type</option>
                      <option value="saving">Saving</option> {/* Match API values */}
                      <option value="current">Current</option>
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
                    {error.errors.accountType && (
                      <p>{error.errors.accountType}</p>
                    )}
                    {Object.keys(error.errors)
                      .filter((key) => key !== "accountType")
                      .map((key, index) => (
                        <p key={index}>{error.errors[key]}</p>
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

export default UserProfile;
