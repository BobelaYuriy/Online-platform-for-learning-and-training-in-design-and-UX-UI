import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
export const CourseCard = ({ course }) => {
  return (
    <Col xs={12} md={6} lg={4} xl={3}>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{course.title}</Card.Title>
          <Card.Text>{course.description}</Card.Text>
          {/* Використовуйте Button та Link */}
          <Button as={Link} to={course.url} variant="primary">
            Learn More
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};
