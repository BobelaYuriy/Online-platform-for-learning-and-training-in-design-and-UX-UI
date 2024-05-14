import React from "react";
import "./ArticleCard.css"; // Import CSS file for styling

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <img className="article-image" src={article.imageUrl} alt="Article" />
      <div className="article-content">
        <h3 className="article-title">{article.title}</h3>
        <p className="article-description">{article.description}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
