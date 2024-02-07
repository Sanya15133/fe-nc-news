import React, { useEffect, useState } from "react";
import { getCommentsById } from "../../api";
import { Link, useParams } from "react-router-dom";

export default function AllCommentsById() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { article_id } = useParams();

  useEffect(() => {
    getCommentsById(article_id)
      .then((commentData) => {
        setComments(commentData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  if (isLoading)
    return (
      <div className="loading">
        <p>Page is loading, will be up and running soon!</p>
      </div>
    );

  if (isError)
    return (
      <div className="loading">
        <p>Oops! Erm, something has gone wrong!</p>
      </div>
    );

  return (
    <section className="comment-card">
      {comments.map(({ body, author, comment_id, votes }) => {
        return (
          <div key={comment_id} className="comment">
            <h4 className="centered">Author: {author}</h4>
            <p>{body}</p>
            <p className="votes-info">Votes: {votes}</p>
          </div>
        );
      })}
    </section>
  );
}
