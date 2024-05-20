import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { MyButton } from "../UI/button/MyButton";
import Search from "../UI/search/search";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../store/slices/userSlice";
import { userApi } from "../../services/userServices";
import "./Header.css";

export const Header = () => {
  const { isAuthorized } = useSelector((state) => state.user);
  const { data: userData } = userApi.useGetUserQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const handleCategoryClick = (category) => {
    navigate(`/courses/${category}`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Navbar className="navbar" collapseOnSelect expand="lg" variant="dark">
      <Navbar.Brand className="sans ms-3">Design and UX&UI</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">
            <div className="sans">Home</div>
          </Link>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title="Courses"
            menuVariant="dark"
            className="sans"
          >
            <NavDropdown.Item
              onClick={() => handleCategoryClick("graphicdesign")}
            >
              Graphic design
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => handleCategoryClick("design")}>
              Design
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => handleCategoryClick("uiux")}>
              UX&UI design
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Search onSearch={handleSearch} />

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
                    onClick={handleSignOut}
                  >
                    Sign out
                  </MyButton>
                </Link>
                {isAuthorized && <BurgerMenu userData={userData} />}
              </Nav.Item>
            )}
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
