import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./ArticleCard.css";
import { MyButton } from "../UI/button/MyButton";
const ArticleCard = ({ _id, title, description, coverImage }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/articles/${_id}`);
  };

  return (
    <Card className="article-card">
      <Card.Img
        variant="top"
        src={coverImage}
        alt={title}
        className="article-card__image"
      />
      <Card.Body className="article-card__content">
        <Card.Title className="article-card__title">{title}</Card.Title>
        <Card.Text className="article-card__description">
          {description}
        </Card.Text>
        <MyButton
          style={{ width: "150px" }}
          variant="primary"
          onClick={handleReadMore}
          className="article-card__button"
        >
          Read More
        </MyButton>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard;
