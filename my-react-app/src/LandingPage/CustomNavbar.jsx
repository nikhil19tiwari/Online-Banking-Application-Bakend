import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "bootstrap/dist/css/bootstrap.min.css";

function CustomNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="primary" dark expand="md" className="p-3">
        {/* Add logo image next to NavbarBrand */}
        <NavbarBrand href="/" className="d-flex align-items-center">
          <img
            src="/images/bank logo.jpg" // Update the image path if needed
            alt="Bank Logo"
            style={{
              width: "50px",
              height: "50px",
              marginRight: "15px",
              borderRadius: "50%",
            }}
          />
          <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Dynamic Bank</span>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto w-100 d-flex justify-content-evenly" navbar>
            <NavItem>
              <Link to="/home" style={{ fontSize: "1.2rem", color: "white", textDecoration: "none" }}>
                Home
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/signup" style={{ fontSize: "1.2rem", color: "white", textDecoration: "none" }}>
                Sign Up
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/contact" style={{ fontSize: "1.2rem", color: "white", textDecoration: "none" }}>
                Contact
              </Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={{ fontSize: "1.2rem", color: "white" }}>
                Roles
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem><Link to="/login">
                Customer
              </Link></DropdownItem>
                <DropdownItem><Link to="/adminlogin">
                Admin
              </Link></DropdownItem>
                <DropdownItem divider />
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText className="text-white" style={{ fontSize: "1.2rem" }}>
            Welcome!
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
