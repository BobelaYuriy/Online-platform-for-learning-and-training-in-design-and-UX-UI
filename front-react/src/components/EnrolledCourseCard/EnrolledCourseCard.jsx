import React from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MyButton } from "../UI/button/MyButton";
import "./EnrolledCourseCard.css"; // Importing the CSS file

export const EnrolledCourseCard = ({ enrolledCourse }) => {
  const navigate = useNavigate();

  return (
    <Col xs={12} md={6} lg={4} xl={3}>
      <Card className="enrolled-course-card mb-3">
        <div className="card-image-wrapper">
          <Card.Img
            variant="top"
            src={enrolledCourse.image}
            className="card-image"
          />
        </div>
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title className="card-title">{enrolledCourse.title}</Card.Title>
          <MyButton
            className="continue-button"
            onClick={() =>
              navigate(
                `/courses/${enrolledCourse.category}/id/${enrolledCourse.courseId}`
              )
            }
          >
            To course
          </MyButton>
        </Card.Body>
      </Card>
    </Col>
  );
};
