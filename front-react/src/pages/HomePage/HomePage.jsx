import React, { useEffect } from "react";
import { useSearchQuery } from "../../SearchQueryContext";
import { courseApi } from "../../services/coursesService";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { Card } from "react-bootstrap";

export const HomePage = () => {
  const { searchQuery } = useSearchQuery();

  const {
    data: articles,
    isLoading,
    error,
    refetch, // This function will be used to refetch articles based on the search query
  } = courseApi.useGetAllArticlesQuery({ search: searchQuery });

  useEffect(() => {
    // Refetch articles whenever the searchQuery changes
    refetch();
  }, [searchQuery, refetch]);

  if (isLoading) return <div>Loading articles...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="container rounded p-4 bg-light mt-2">
        <div className="text-center">
          <h1 className="mb-4">Online Design Platform</h1>
          <p className="lead">
            Welcome to our online platform dedicated to design enthusiasts.
            Whether you're a professional designer or just starting out, our
            platform offers resources, tools, and inspiration to help you
            unleash your creativity and bring your ideas to life.
          </p>
        </div>
      </div>
      <h1 className="text-center text-white mt-2" style={{ fontSize: "3rem" }}>
        Articles
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
