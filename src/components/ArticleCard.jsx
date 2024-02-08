import React, { useEffect, useState } from "react";
import { getArticleById } from "../../api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ArticleCard() {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id)
      .then((articleData) => {
        setArticle(articleData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [article_id]);

  if (isLoading)
    return (
      <div className="loading">
        <p>Page is loading, will be up and running soon!</p>
      </div>
    );

  if (isError)
    return (
      <div className="loading">
        <p>Oops! This article has no comments!</p>
      </div>
    );

  return (
    <section>
      <div key={article.article_id} className="articles-body">
        <h4 className="article-heading">{article.title}</h4>
        <img src={article.article_img_url} className="images" />
        <br></br>
        <p className="article-text">{article.body}</p>
        <p className="article-author">Author: {article.author}</p>
      </div>
      <div className="comment-section">
        <p className="comment-article">
          <Link to={`/articles/${article_id}/comments`}>
            {article.comment_count} Comments
          </Link>
        </p>
        <div className="votes">
          <p>👍🏼</p> {article.votes}
          <p>👎🏼</p>
        </div>
      </div>
    </section>
  );
}
