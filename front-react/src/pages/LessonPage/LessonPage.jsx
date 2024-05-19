import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Accordion, Card, Container, Button } from "react-bootstrap";
import YouTube from "react-youtube";
import { courseApi } from "../../services/coursesService"; // Ensure this path is correct
import "./LessonPage.css";
import Test from "../../components/Test/Test";
import { MyButton } from "../../components/UI/button/MyButton";

const LessonPage = () => {
  const { id, lessonIndex } = useParams();
  const {
    data: lesson,
    isLoading,
    isError,
  } = courseApi.useGetLessonQuery({
    courseId: id,
    lessonIndex: lessonIndex,
  });

  const [showVideo, setShowVideo] = useState(true);
  const [showTest, setShowTest] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [submitUserAnswers] = courseApi.useSubmitUserAnswersMutation();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching lesson data</div>;

  const getYouTubeVideoId = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const videoId = getYouTubeVideoId(lesson.video);

  const handleTestSubmit = async () => {
    try {
      await submitUserAnswers({ courseId: id, lessonIndex, userAnswers });
      alert("Answers submitted successfully!");
    } catch (error) {
      console.error("Failed to submit answers", error);
      alert("Failed to submit answers");
    }
  };

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
                    <Test
                      questions={lesson.tests.questions}
                      setUserAnswers={setUserAnswers}
                    />
                    <MyButton onClick={handleTestSubmit}>Submit</MyButton>
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
