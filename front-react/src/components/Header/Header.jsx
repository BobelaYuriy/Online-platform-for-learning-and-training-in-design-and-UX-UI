import React, { useState } from "react";
import { Button, Navbar, Nav, Form, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BurgerMenuButton } from "../BurgerMenuButton/BurgerMenuButton";
import { MyButton } from "../UI/button/MyButton";
import Search from "../UI/search/search";
export const Header = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      style={{ background: "rgb(50, 19, 54)" }}
    >
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

        <Search />

        <Nav>
          <Nav.Item className="d-flex justify-content-between">
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <MyButton
                style={{
                  width: 100,
                  height: 50,
                  marginRight: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Sign in
              </MyButton>
            </Link>

            {/* <MyButton
              style={{
                width: 90,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Sign out
            </MyButton> */}
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
