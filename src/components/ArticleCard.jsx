import React, { useEffect, useState, useContext } from "react";
import {
  getArticleById,
  updateArticleVotesById,
  deleteArticleById,
} from "../../api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { CommentAdder } from "./CommentAdder";
import { UserContext } from "./UserContext";

export default function ArticleCard() {
  const [article, setArticle] = useState([]);
  const [votes, setVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  const { article_id } = useParams();

  function handleDelete(article_id) {
    if (window.confirm("Are you sure you want to delete this article?")) {
      deleteArticleById(article_id)
        .then(() => {
          // Refetch articles after deletion
          getArticles(topicNames, getSortBy, getOrderBy)
            .then((articleData) => {
              setArticles(articleData);
              setIsDeleted(true);
            })
            .catch(() => {
              setIsError(true);
            });
        })
        .catch(() => {
          setIsError(true);
        });
    }
  }

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
    updateArticleVotesById(article_id, event);
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
        {loggedInUser.username === article.author ? (
          <button onClick={() => handleDelete(article_id)}>
            Delete Article
          </button>
        ) : null}
      </div>
      <CommentAdder />
      {isDeleted ? alert("Article has been succesfully deleted!") : null}
    </section>
  );
}
