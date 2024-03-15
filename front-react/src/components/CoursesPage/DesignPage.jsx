import React, { useState, useEffect } from "react";
import { CourseCard } from "../CourseCard/CourseCard";
import { Container, Row } from "react-bootstrap";

export const DesignPage = () => {
  const [courses, setCourses] = useState([]);

  // const fetchCourses = async () => {
  //   try {
  //     // Replace "your-backend-api-url" with your actual backend API URL
  //     const response = await fetch("your-backend-api-url");
  //     const data = await response.json();
  //     setCourses(data);
  //   } catch (error) {
  //     console.error("Error fetching courses:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchCourses();
  // }, []);

  // Example dummyCourses data
  const dummyCourses = [
    {
      id: 1,
      title: "UX/UI Design Fundamentals",
      description:
        "Learn the basics of user experience and user interface design",
      url: "https://example.com/course1",
    },
    {
      id: 2,
      title: "Advanced UX/UI Design Techniques",
      description: "Take your UX/UI design skills to the next level",
      url: "https://example.com/course2",
    },
    {
      id: 3,
      title: "Responsive Web Design",
      description:
        "Master the art of designing websites that work on all devices",
      url: "https://example.com/course3",
    },
    {
      id: 4,
      title: "Responsive Web Design",
      description:
        "Master the art of designing websites that work on all devices",
      url: "https://example.com/course3",
    },
    {
      id: 5,
      title: "Responsive Web Design",
      description:
        "Master the art of designing websites that work on all devices",
      url: "https://example.com/course3",
    },
  ];

  return (
    <Container>
      <div className="container rounded p-4 bg-light">
        <h1>Courses on UX/UI Design</h1>
      </div>
      <Row className="mt-2">
        {/* Map through the dummyCourses and display each one as a CourseCard */}
        {dummyCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </Row>
    </Container>
  );
};
