import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import { courseApi } from "../../services/coursesService";
import { useParams, useNavigate } from "react-router-dom";
import { MyButton } from "../../components/UI/button/MyButton";

const DetailsCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);

  const {
    data: course,
    isLoading,
    isError,
  } = courseApi.useGetCourseIdQuery(id);

  const [selectedLesson, setSelectedLesson] = useState(null);

  // Використовуйте useEnrollCourseMutation з RTK Query
  const [enrollCourse] = courseApi.useEnrollCourseMutation();
  const [unenrollCourse] = courseApi.useUnenrollCourseMutation();

  useEffect(() => {
    if (course && course.isEnrolled) {
      setIsEnrolled(true);
    }
  }, [course]);

  const handleEnrollNowClick = async () => {
    try {
      await enrollCourse(id).unwrap();
      setIsEnrolled(true);
    } catch (error) {
      console.error("Error enrolling course:", error);
    }
  };

  const handleUnenrollNowClick = async () => {
    try {
      await unenrollCourse(id).unwrap();
      setIsEnrolled(false);
    } catch (error) {
      console.error("Error enrolling course:", error);
    }
  };

  const handleGoToLessonsClick = () => {
    navigate(`/coursesuiux/id/${id}/lessons`);
  };

  if (isLoading)
    return (
      <div className="container rounded p-4 bg-light text-center">
        Loading...
      </div>
    );
  if (isError) return <div>Error fetching data</div>;

  return (
    <Container className="mt-4">
      {course && (
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <Card.Text>Lessons:</Card.Text>

                <Accordion defaultActiveKey="0">
                  {course.lessons.map((lesson, index) => (
                    <Accordion.Item
                      key={index.toString()}
                      className="item"
                      eventKey={index.toString()}
                    >
                      <Accordion.Header>{lesson.title}</Accordion.Header>
                      <Accordion.Body>
                        <h5>Description:</h5>
                        {lesson.description}
                        <h5>Duration:</h5>
                        {lesson.duration}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Col>
              <Col md={4}>
                <Card.Img variant="top" src={course.image} />
                <Card.Body>
                  {isEnrolled ? (
                    <Row className="justify-content-between">
                      <MyButton
                        variant="success"
                        onClick={handleGoToLessonsClick}
                        style={{ width: "150px" }}
                      >
                        Go to Lessons
                      </MyButton>
                      <MyButton
                        variant="success"
                        onClick={handleUnenrollNowClick}
                        style={{ width: "150px" }}
                      >
                        Unenroll course
                      </MyButton>
                    </Row>
                  ) : (
                    <MyButton variant="primary" onClick={handleEnrollNowClick}>
                      Enroll Now
                    </MyButton>
                  )}
                </Card.Body>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default DetailsCoursePage;
