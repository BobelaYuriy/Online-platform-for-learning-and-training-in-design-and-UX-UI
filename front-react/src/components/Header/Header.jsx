import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { MyButton } from "../UI/button/MyButton";
import Search from "../UI/search/search";
import Avatar from "../UI/Avatar/Avatar";
import { useSelector } from "react-redux";
import "./Header.css";
export const Header = () => {
  const { isAuthorized } = useSelector((state) => state.user);

  return (
    <Navbar className="navbar" collapseOnSelect expand="lg" variant="dark">
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
                {isAuthorized && <BurgerMenu />}
              </Nav.Item>
            )}
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
