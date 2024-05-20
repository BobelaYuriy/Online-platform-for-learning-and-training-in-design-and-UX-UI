import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Accordion, Card, Container } from "react-bootstrap";
import YouTube from "react-youtube";
import { courseApi } from "../../services/coursesService";
import { userApi } from "../../services/userServices"; // Імпортуємо userApi
import "./LessonPage.css";
import Test from "../../components/Test/Test";
import { MyButton } from "../../components/UI/button/MyButton";

const LessonPage = () => {
  const { id, lessonIndex, category } = useParams();
  const navigate = useNavigate();
  const {
    data: lesson,
    isLoading: isLessonLoading,
    isError: isLessonError,
  } = courseApi.useGetLessonQuery({
    courseId: id,
    lessonIndex: lessonIndex,
  });

  const [userAnswers, setUserAnswers] = useState([]);
  const [submitUserAnswers] = courseApi.useSubmitUserAnswersMutation();
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = userApi.useGetUserQuery(); // Отримуємо дані користувача через userApi

  useEffect(() => {
    // Перевіряємо, чи є дані користувача та уроку перед виконанням ефекту
    if (userData && lesson) {
      // Знаходимо інформацію про тест для поточного уроку в масиві enrolledCourses користувача
      const enrolledCourse = userData.enrolledCourses.find(
        (course) => course.courseId === id
      );
      if (enrolledCourse) {
        const lessonInfo = enrolledCourse.lessons.find(
          (lesson) => lesson._id === lessonIndex
        );
        if (lessonInfo && lessonInfo.testInfo) {
          // Якщо є інформація про тест, оновлюємо стан користувача
          setUserAnswers(lessonInfo.testInfo.userAnswers);
        }
      }
    }
  }, [userData, lesson]);

  const handleTestSubmit = async () => {
    try {
      await submitUserAnswers({ courseId: id, lessonIndex, userAnswers });
      alert("Answers submitted successfully!");
      navigate(`/courses/${category}/id/${id}/lessons`);
    } catch (error) {
      console.error("Failed to submit answers", error);
      alert("Failed to submit answers");
    }
  };

  if (isLessonLoading || isUserLoading) return <div>Loading...</div>;
  if (isLessonError || isUserError) return <div>Error fetching data</div>;

  const getYouTubeVideoId = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const videoId = getYouTubeVideoId(lesson.video);

  return (
    <div>
      {lesson && (
        <Container className="mt-4">
          <Card>
            <div>
              <h2>{lesson.title}</h2>
              <p>{lesson.description}</p>
              <Accordion defaultActiveKey="0" alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Video</Accordion.Header>
                  <Accordion.Body>
                    <div className="video-container">
                      {videoId ? (
                        <YouTube videoId={videoId} />
                      ) : (
                        <div>Invalid video URL</div>
                      )}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Test</Accordion.Header>
                  <Accordion.Body>
                    {lesson.testInfo ? (
                      <div>
                        <p>
                          You have already completed this test. Here are your
                          results:
                        </p>
                        <p>
                          Score: {} / {}
                        </p>
                        <p>Percentage Correct: {}%</p>
                      </div>
                    ) : (
                      <div>
                        <Test
                          questions={lesson.tests.questions}
                          setUserAnswers={setUserAnswers}
                        />
                        <MyButton onClick={handleTestSubmit}>Submit</MyButton>
                      </div>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Card>
        </Container>
      )}
    </div>
  );
};

export default LessonPage;
