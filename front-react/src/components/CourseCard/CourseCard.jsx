import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // Додайте імпорт Link з react-router-dom
import { MyButton } from "../UI/button/MyButton";
import { useNavigate } from "react-router-dom";
import "./CourseCard.css";
export const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <Col xs={12} md={6} lg={4} xl={3}>
      <Card className="mb-3" style={{ borderRadius: "30px" }}>
        <div
          style={{
            maxWidth: "100%",
            overflow: "hidden",
            borderRadius: "30px 30px 0 0",
          }}
        >
          <Card.Img
            variant="top"
            src={course.image} // Потрібно вказати шлях до зображення у властивості src
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "30px 30px 0 0",
            }}
          />
        </div>
        <Card.Body>
          <Card.Title>{course.title}</Card.Title>
          <Card.Text>{course.description}</Card.Text>
        </Card.Body>
        <MyButton
          style={{ width: "200px" }}
          onClick={() => navigate(`/coursesuiux/id/${course._id}`)}
        >
          To course
        </MyButton>
      </Card>
    </Col>
  );
};
