import React from "react";
import Avatar from "../../components/UI/Avatar/Avatar";
import { EnrolledCourseCard } from "../../components/EnrolledCourseCard/EnrolledCourseCard";
import { userApi } from "../../services/userServices";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import "./ProfilePage.css";

function ProfilePage() {
  const { data: userData, isLoading, error } = userApi.useGetUserQuery();
  console.log(userData);
  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
        <span className="ml-2">Loading...</span>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <Alert variant="danger">
          Error fetching user data: {error.message}
        </Alert>
      </Container>
    );
  }

  if (!userData || !userData.enrolledCourses) {
    return (
      <Container className="text-center my-5">
        <Alert variant="warning">No user data found</Alert>
      </Container>
    );
  }

  return (
    <Container className="profile-container my-5">
      <Card className="profile-header p-3">
        <Card.Body>
          <Row className="align-items-center">
            <Col xs="auto">
              <Avatar src={userData.avatar} size="large" />
            </Col>
            <Col>
              <Card.Title className="nickname">{userData.username}</Card.Title>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card className="profile-section mt-4">
        <Card.Body>
          <Card.Title className="section-heading">Enrolled Courses</Card.Title>
          <Row>
            {userData.enrolledCourses.map((course) => (
              <Col md={6} lg={4} className="my-3" key={course.courseId}>
                <EnrolledCourseCard enrolledCourse={course} />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProfilePage;
