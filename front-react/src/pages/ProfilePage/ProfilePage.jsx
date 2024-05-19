import React, { useState, useEffect } from "react";
import Avatar from "../../components/UI/Avatar/Avatar";
import { EnrolledCourseCard } from "../../components/EnrolledCourseCard/EnrolledCourseCard";
import { userApi } from "../../services/userServices";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { checkAuth } from "../../network/network";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Form,
  Button,
} from "react-bootstrap";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { data: userData, isLoading, error } = userApi.useGetUserQuery();
  const [updateProfile] = userApi.useUpdateProfileMutation();
  const [avatar, setAvatar] = useState("");
  const [nickname, setNickname] = useState(userData?.username || "");
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
      try {
        const data = checkAuth();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [userData, dispatch]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatar = reader.result;
        setAvatar(newAvatar);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    updateProfile({ username: nickname, avatar });
    setIsEditing(false);
  };

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

  const totalCourses = userData.enrolledCourses.length;
  const completedCourses = userData.enrolledCourses.filter(
    (course) => course.isCompleted
  ).length;
  const inProgressCourses = totalCourses - completedCourses;

  return (
    <Container className="profile-container my-5">
      <Card className="profile-header p-3 text-white bg-gradient-primary">
        <Card.Body>
          <Row className="align-items-center">
            <Col xs="auto">
              <Avatar
                userData={userData}
                size="large"
                onAvatarChange={isEditing ? handleAvatarChange : null}
              />
            </Col>
            <Col>
              {isEditing ? (
                <Form.Control
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="nickname-input"
                />
              ) : (
                <Card.Title className="nickname">
                  {userData.username}
                </Card.Title>
              )}
              <Card.Text className="user-stats">
                <span>Total Courses: {totalCourses}</span> |
                <span> Completed: {completedCourses}</span> |
                <span> In Progress: {inProgressCourses}</span>
              </Card.Text>
            </Col>
          </Row>
          <Button variant="secondary" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
          {isEditing && (
            <Button
              variant="primary"
              className="ml-2"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          )}
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
};

export default ProfilePage;
