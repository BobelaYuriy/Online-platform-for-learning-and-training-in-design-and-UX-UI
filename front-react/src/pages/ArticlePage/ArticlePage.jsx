import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { courseApi } from "../../services/coursesService";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Card,
  Image,
} from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import "./ArticlePage.css";

const ArticlePage = () => {
  const [article, setArticle] = useState(null);
  const { id } = useParams(); // Get article ID from URL
  const {
    data: fetchedArticle,
    isLoading,
    error,
  } = courseApi.useGetArticleByIdQuery(id);

  useEffect(() => {
    if (fetchedArticle) {
      setArticle(fetchedArticle);
    }
  }, [fetchedArticle]);

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error: {error.message}</Alert>
      </Container>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card>
            <Card.Img
              variant="top"
              src={article.coverImage}
              alt={article.title}
              className="article-card__image"
            />
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                By {article.author}
              </Card.Subtitle>
              <Card.Text>{article.description}</Card.Text>
              <ReactMarkdown className="article-content">
                {article.content}
              </ReactMarkdown>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ArticlePage;
