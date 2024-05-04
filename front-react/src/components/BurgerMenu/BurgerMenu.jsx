import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../UI/Avatar/Avatar";

export const BurgerMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggle = () => setShowMenu(!showMenu);

  return (
    <>
      {/* Використовуємо кнопку з ролью кнопки замість компонента аватара */}
      <button
        className="avatar-button"
        onClick={handleToggle}
        style={{
          border: "none", // Видаляємо рамку
          background: "transparent", // Прозорий фон
          padding: 0, // Видаляємо відступи
          cursor: "pointer", // Змінюємо вигляд курсору на палець
        }}
      >
        <Avatar
          imageSrc={
            "https://i.pinimg.com/564x/96/b8/7e/96b87ed46354a6bcedaef2799b6553c3.jpg"
          }
          size="medium"
          style={{
            borderRadius: "50%", // Заокруглюємо краї аватара
          }}
        />
      </button>
      {/* Offcanvas для відображення меню */}
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
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/userCourses" style={{ textDecoration: "none" }}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                Contact
              </Link>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
