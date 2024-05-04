import React, { useState, useEffect } from "react";
import { CourseCard } from "../../components/CourseCard/CourseCard";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../network/network";
import { courseApi } from "../../services/coursesService";

const DesignPage = () => {
  const { data: courses } = courseApi.useGetCoursesQuery(10);
  return (
    <Container>
      <div className="container rounded p-4 bg-light">
        <h1>Courses on UX/UI Design</h1>
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
