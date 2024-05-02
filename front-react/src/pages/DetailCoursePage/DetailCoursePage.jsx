import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
import { courseApi } from "../../services/coursesService";
import { useParams } from "react-router-dom";
import { MyButton } from "../../components/UI/button/MyButton";

const DetailsCoursePage = () => {
  const { id } = useParams();

  const {
    data: course,
    isLoading,
    isError,
  } = courseApi.useGetCourseIdQuery(id);

  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson === selectedLesson ? null : lesson);
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
                  <MyButton variant="primary">Enroll Now</MyButton>
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
