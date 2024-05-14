// BurgerMenu.js
import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../UI/Avatar/Avatar";

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
        }}
      >
        {/* Передаємо дані користувача в Avatar */}
        <Avatar
          userData={userData}
          size="medium"
          style={{
            borderRadius: "50%", // Заокруглюємо краї аватара
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Avatar
              userData={userData}
              size="large"
              style={{
                borderRadius: "50%", // Заокруглюємо краї аватара
              }}
            />
            <ul
              className="ulSans"
              style={{ listStyleType: "none", padding: 0 }}
            >
              <li>
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/userCourses" style={{ textDecoration: "none" }}>
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ textDecoration: "none" }}>
                  Statistic
                </Link>
              </li>
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
