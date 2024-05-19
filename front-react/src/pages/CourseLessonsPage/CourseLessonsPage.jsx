import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
} from "react-bootstrap";
import { courseApi } from "../../services/coursesService";
import { useParams, useNavigate } from "react-router-dom";
import "./CourseLessonsPage.css"; // Import styles

const CourseLessonsPage = () => {
  const { id, category } = useParams(); // Destructure category from params
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState([]);

  const {
    data: course,
    isLoading,
    isError,
  } = courseApi.useGetCourseLessonsQuery(id);

  useEffect(() => {
    if (course && course.lessons) {
      const savedCompletedLessons =
        JSON.parse(localStorage.getItem(`completedLessons-${id}`)) || [];
      setCompletedLessons(savedCompletedLessons);
    }
  }, [course, id]);

  const handleGoToLessonClick = (lessonId) => {
    navigate(`/courses/${category}/id/${id}/lessons/${lessonId}`); // Use dynamic category
  };

  if (isLoading)
    return (
      <div className="container rounded p-4 bg-light text-center">
        Loading...
      </div>
    );
  if (isError) return <div>Error fetching data</div>;

  return (
    <Container className="course-lessons-container mt-4">
      <Row>
        <Col>
          <h2 className="course-title">{course.title} - Lessons</h2>
          <div className="custom-progress-bar">
            <ProgressBar
              now={course.progress}
              label={`${course.progress}%`}
              className="mb-4"
            />
          </div>
          {course.lessons.map((lesson, index) => (
            <div key={index} className="lesson-card-wrapper">
              <Card className="mb-3 course-lesson-card border-0">
                <Card.Body style={{ backgroundColor: "white" }}>
                  <Row>
                    <Col>
                      <Card.Title>{lesson.title}</Card.Title>
                      <Card.Text>{lesson.description}</Card.Text>
                      <Card.Text>
                        Completed Tests: {lesson.completedTests}
                      </Card.Text>
                    </Col>
                    <Col md="auto">
                      <Button
                        variant="primary"
                        onClick={() => handleGoToLessonClick(index)}
                        className="me-2"
                      >
                        Go to Lesson
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CourseLessonsPage;
