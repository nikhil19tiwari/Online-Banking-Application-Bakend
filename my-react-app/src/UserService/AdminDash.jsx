import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  NavbarToggler,
  Badge,
} from "reactstrap";
import { getAdminAccountDetails, approveOrRejectAccount } from "../services/user-service";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes, FaFilter } from "react-icons/fa";

function AdminDashboard() {
  const [accounts, setAccounts] = useState([]); // List of accounts
  const [filter, setFilter] = useState(""); // Account type filter
  const [loading, setLoading] = useState(false); // Loading state for fetching accounts
  const [error, setError] = useState(null); // Error state
  const [actionLoading, setActionLoading] = useState(false); // Loading state for actions
  const [isOpen, setIsOpen] = useState(false); // Navbar toggle state

  const toggleNavbar = () => setIsOpen(!isOpen);

  // Fetch accounts whenever the filter changes
  useEffect(() => {
    fetchAccounts(filter);
  }, [filter]);

  // Function to fetch accounts from backend
  const fetchAccounts = (accountType) => {
    setLoading(true);
    setError(null);

    getAdminAccountDetails(accountType)
      .then((data) => setAccounts(data))
      .catch((error) => {
        console.error("Error fetching accounts:", error);
        setError("Failed to load account details. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  // Function to handle account actions (Approve/Reject)
  const handleAction = (accountNumber, action) => {
    setActionLoading(true);
    approveOrRejectAccount(accountNumber, action)
      .then((response) => {
        alert(response);
        fetchAccounts(filter); // Refresh the list after action
      })
      .catch((error) => {
        console.error("Error performing action:", error);
        alert("Failed to perform the action. Please try again.");
      })
      .finally(() => setActionLoading(false));
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar color="dark" dark expand="md" className="shadow">
        <Container>
          <NavbarBrand href="/" className="text-white">
            <strong>Admin Dashboard</strong>
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {["Dashboard", "Accounts", "Transactions", "Settings", "Logout"].map(
                (link) => (
                  <NavItem key={link}>
                    <NavLink
                      tag={Link}
                      to={`/${link.toLowerCase()}`}
                      className={`text-white ${
                        filter === link ? "active text-warning" : ""
                      }`}
                    >
                      {link}
                    </NavLink>
                  </NavItem>
                )
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>

      {/* Filter Buttons */}
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col sm="12" className="text-center mb-3">
            <h3>Account Management</h3>
          </Col>
          <Col sm="12" className="mb-4 text-center">
            {["Saving", "Current"].map((type) => (
              <Button
                key={type}
                color="primary"
                onClick={() => setFilter(type)}
                active={filter === type}
                className="me-2"
              >
                <FaFilter className="me-2" />
                {type} Accounts
              </Button>
            ))}
          </Col>

          {/* Error Alert */}
          {error && (
            <Col sm="12" className="mb-3">
              <Alert color="danger">{error}</Alert>
            </Col>
          )}

          {/* Loading Spinner */}
          {loading ? (
            <Col sm="12" className="text-center">
              <Spinner color="primary" />
            </Col>
          ) : accounts.length > 0 ? (
            // Account Cards
            <Row>
              {accounts.map((account) => (
                <Col sm="12" md="6" lg="4" key={account.accountNumber} className="mb-4">
                  <Card className="shadow border-0">
                    <CardHeader className="bg-primary text-white">
                      <strong>{account.userName}</strong> - {account.accountType}
                    </CardHeader>
                    <CardBody>
                      <p>
                        <strong>Name:</strong> {account.firstName} {account.lastName}
                      </p>
                      <p>
                        <strong>Email:</strong> {account.emailId}
                      </p>
                      <p>
                        <strong>Account Number:</strong> {account.accountNumber}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <Badge
                          color={
                            account.status === "ACTIVE"
                              ? "success"
                              : "warning text-dark"
                          }
                        >
                          {account.status}
                        </Badge>
                      </p>
                      <div className="d-flex justify-content-between">
                        <Button
                          color="success"
                          onClick={() => handleAction(account.accountNumber, "Approve")}
                          disabled={actionLoading}
                          className="w-45"
                        >
                          {actionLoading ? <Spinner size="sm" /> : <FaCheck className="me-1" />}
                          Approve
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => handleAction(account.accountNumber, "Reject")}
                          disabled={actionLoading}
                          className="w-45"
                        >
                          {actionLoading ? <Spinner size="sm" /> : <FaTimes className="me-1" />}
                          Reject
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Col sm="12">
              <h4 className="text-center text-muted">No accounts found for this filter.</h4>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;
