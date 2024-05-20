import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../UI/Avatar/Avatar";
import "./BurgerMenu.css";

export const BurgerMenu = ({ userData }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggle = () => setShowMenu(!showMenu);

  return (
    <>
      <button
        className="avatar-button"
        onClick={handleToggle}
        style={{
          border: "none",
          background: "transparent",
          padding: 0,
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        <Avatar
          userData={userData}
          size="medium"
          style={{
            borderRadius: "50%",
          }}
        />
      </button>
      <Offcanvas
        show={showMenu}
        onHide={() => setShowMenu(false)}
        placement="end"
        style={{ position: "fixed" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="burger-menu-content">
            <Avatar
              userData={userData}
              size="large"
              style={{
                borderRadius: "50%",
              }}
            />
            <ul className="ulSans">
              <li>
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
