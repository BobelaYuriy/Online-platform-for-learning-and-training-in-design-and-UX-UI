import React, { useState, useEffect } from "react";
import { CourseCard } from "../../components/CourseCard/CourseCard";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../network/network";
import { courseApi } from "../../services/coursesService";

const DesignPage = () => {
  const prikol = useSelector((state) => state.course.prikol);
  const { data: courses } = courseApi.useGetCoursesQuery(10);
  console.log(prikol);
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
      {!prikol && <h1>О ЦЕ ПРИКОЛ АХАХАХА</h1>}
    </Container>
  );
};

export default DesignPage;
