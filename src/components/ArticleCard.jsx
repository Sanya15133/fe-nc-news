import React, { useEffect, useState } from "react";
import { getArticleById, updateVotesById } from "../../api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { CommentAdder } from "./CommentAdder";

export default function ArticleCard() {
  const [article, setArticle] = useState([]);
  const [votes, setVotes] = useState(0);
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

  function handleClick(event) {
    setVotes((currVotes) => {
      return (currVotes += +event);
    });
    updateVotesById(article_id, event);
  }

  return (
    <section>
      <div key={article.article_id} className="articles-body">
        <h4 className="article-heading">{article.title}</h4>
        <img src={article.article_img_url} className="images" />
        <br></br>
        <p className="article-text">{article.body}</p>
        <div className="article-author">
          Posted by {article.author} on {format(article.created_at, "PPPP")}
          <div className="votes">
            {votes}
            <button onClick={() => handleClick(1)}>👍🏼</button>
            <button onClick={() => handleClick(-1)}>👎🏼</button>
          </div>
        </div>
      </div>
      <div className="comment-section">
        <p className="comment-article">
          <Link to={`/articles/${article_id}/comments`}>
            {article.comment_count} Comments
          </Link>
        </p>
      </div>
      <CommentAdder />
    </section>
  );
}
