import React, { useEffect, useState, useContext } from "react";
import { getCommentsById, deleteCommentByCommentId } from "../../api"; // Assuming deleteCommentByCommentId is imported from the api module
import { Link, useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { UserContext } from "./UserContext";
import ToggleableComment from "./ToggleComments";

const AllCommentsById = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [deleteComment, setDeleteComment] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  const { article_id } = useParams();

  function handleComment(event) {
    setDeleteComment(event.target.value);
  }

  function handleDelete(comment_id) {
    deleteCommentByCommentId(comment_id)
      .then((response) => {
        console.log(response, "response");
        // refresh comments after deletion
        getCommentsById(article_id)
          .then((commentData) => {
            setComments(commentData);
            setIsDeleted(true);
          })
          .catch(() => {
            setIsError(true);
          });
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }

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
        <p>Oops! This article has no comments to show!</p>
      </div>
    );

  return (
    <div className="comment-card">
      <Link to={`/articles/${article_id}`}>
        <p>Back to article</p>
      </Link>
      {comments.map((comment) => {
        return (
          <div key={comment.comment_id}>
            <CommentCard key={comment.comment_id} comment={comment} />
            {loggedInUser.username === comment.author ? (
              <button onClick={() => handleDelete(comment.comment_id)}>
                Delete Comment
              </button>
            ) : null}
          </div>
        );
      })}
      {isDeleted ? alert("Comment has been succesfully deleted!") : null}
    </div>
  );
};

export default AllCommentsById;
