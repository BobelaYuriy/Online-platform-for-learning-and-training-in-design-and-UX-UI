import React, { useState } from "react";
import { Button, Navbar, Nav, Form, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BurgerMenuButton } from "../BurgerMenuButton/BurgerMenuButton";

export const Header = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <BurgerMenuButton handleToggle={handleToggle} />
      <Navbar.Brand>Design and UX&UI</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title="Courses"
            menuVariant="dark"
          >
            <NavDropdown.Item href="#action/3.1">
              Graphic design
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="course1">Web design</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="courseuiux">UX&UI design</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        {/* Пошукова стрічка посередині */}
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="mr-2 rounded-pill me-2"
              style={{ width: "400px" }} // Змінюємо ширину тут
            />
          </Form>
        </div>

        <Nav>
          <Nav.Item className="d-flex justify-content-between">
            <Link to="/signin">
              <Button variant="primary" className="me-2">
                Sign In
              </Button>
            </Link>
            <Button variant="primary" className="me-2">
              Sign out
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
