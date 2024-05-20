import React from "react";
import { CourseCard } from "../../components/CourseCard/CourseCard";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { courseApi } from "../../services/coursesService";

const DesignPage = () => {
  const { category } = useParams();
  const {
    data: courses,
    isLoading,
    isError,
  } = courseApi.useGetCoursesQuery({
    category,
  });

  const getCategoryText = (category) => {
    const categoryText = {
      uiux: "UI&UX",
      design: "Design",
      graphicdesign: "Graphic Design",
    };

    return categoryText[category] || category;
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching courses</div>;

  return (
    <Container>
      <div className="container rounded p-4 bg-light">
        <h1>Courses on {getCategoryText(category)}</h1>
      </div>
      <Row className="mt-2">
        {(courses || []).map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </Row>
    </Container>
  );
};

export default DesignPage;
