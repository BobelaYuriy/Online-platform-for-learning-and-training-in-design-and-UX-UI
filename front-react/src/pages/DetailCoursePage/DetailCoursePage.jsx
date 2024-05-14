import React, { useState } from "react";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import { courseApi } from "../../services/coursesService";
import { useParams } from "react-router-dom";
import { MyButton } from "../../components/UI/button/MyButton";

const DetailsCoursePage = () => {
  const { id } = useParams();
  const [isEnrolled, setIsEnrolled] = useState(false);

  const {
    data: course,
    isLoading,
    isError,
  } = courseApi.useGetCourseIdQuery(id);

  const [selectedLesson, setSelectedLesson] = useState(null);

  // Використовуйте useEnrollCourseMutation з RTK Query
  const [enrollCourse] = courseApi.useEnrollCourseMutation();

  const handleEnrollNowClick = async () => {
    // Викличте мутацію для ендпоінта enrollCourse
    try {
      await enrollCourse(id).unwrap();
      setIsEnrolled(true);
    } catch (error) {
      console.error("Error enrolling course:", error);
    }
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
                  {!course.isEnrolled && (
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
