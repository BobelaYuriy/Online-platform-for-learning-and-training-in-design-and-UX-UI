import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseApi } from "../../services/coursesService";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { Card } from "react-bootstrap";

export const HomePage = () => {
  const {
    data: articles,
    isLoading,
    error,
  } = courseApi.useGetAllArticlesQuery();

  if (isLoading) return <div>Loading articles...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="container rounded p-4 bg-light mt-2">
        <div className="text-center">
          <h1 className="mb-4">Design Online Platform</h1>
          <p className="lead">
            Welcome to our online platform dedicated to design enthusiasts.
            Whether you're a professional designer or just starting out, our
            platform offers resources, tools, and inspiration to help you
            unleash your creativity and bring your ideas to life.
          </p>
        </div>
      </div>
      <h1 className="text-center text-white mt-2" style={{ fontSize: "3rem" }}>
        Posts
      </h1>
      <Card className="w-75 mx-auto rounded">
        <div className="d-flex flex-wrap justify-content-center mt-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </Card>
    </div>
  );
};
