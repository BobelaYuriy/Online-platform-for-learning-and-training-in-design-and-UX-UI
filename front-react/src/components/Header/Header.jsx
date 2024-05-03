import React, { useState } from "react";
import { Button, Navbar, Nav, Form, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BurgerMenuButton } from "../BurgerMenuButton/BurgerMenuButton";
import { MyButton } from "../UI/button/MyButton";
import Search from "../UI/search/search";
import Avatar from "../UI/Avatar/Avatar";
import { useSelector } from "react-redux";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { isAuthorized } = useSelector((state) => state.user);
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
        <Nav className="mr-auto">
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

        <Nav className="ml-auto">
          <Nav.Item className="d-flex justify-content-between">
            {!isAuthorized ? (
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
            ) : (
              <Nav.Item className="d-flex align-items-center">
                <Link to="/signin" style={{ textDecoration: "none" }}>
                  <MyButton
                    style={{
                      width: 90,
                      height: 50,
                      marginRight: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Sign out
                  </MyButton>
                </Link>
                {isAuthorized && (
                  <Avatar
                    imageSrc={
                      "https://i.pinimg.com/564x/96/b8/7e/96b87ed46354a6bcedaef2799b6553c3.jpg"
                    }
                    size="medium"
                  />
                )}
              </Nav.Item>
            )}
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
