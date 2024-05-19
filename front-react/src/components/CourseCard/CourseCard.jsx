import React from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom"; // Updated import to include useParams
import { MyButton } from "../UI/button/MyButton";
import "./CourseCard.css";

export const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { category } = useParams(); // Get category from URL params

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
            src={course.image} // Specify the image path
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
          onClick={() => navigate(`/courses/${category}/id/${course._id}`)} // Use dynamic category
        >
          To course
        </MyButton>
      </Card>
    </Col>
  );
};
