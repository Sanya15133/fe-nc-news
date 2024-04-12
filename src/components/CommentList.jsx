import React, { useEffect, useState, useContext } from "react";
import { getCommentsById, deleteCommentByCommentId } from "../../api"; // Assuming deleteCommentByCommentId is imported from the api module
import { Link, useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { UserContext } from "./UserContext";
import { Loading } from "./Loading";

const PAGE_SIZE = 10; // Number of comments per page

const AllCommentsById = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { loggedInUser } = useContext(UserContext);

  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getCommentsById(article_id, currentPage, PAGE_SIZE)
      .then((response) => {
        if (response && response.comments && response.totalPages) {
          console.log("Comments received from API:", response.comments);
          setComments(response.comments);
          setTotalPages(response.totalPages);
          setIsError(false); // Reset error state on successful response
        } else {
          setIsError(true);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id, currentPage]);

  const handleDelete = (comment_id) => {
    deleteCommentByCommentId(comment_id)
      .then(() => {
        // Refresh comments after deletion
        setCurrentPage(1); // Reset to first page after deletion
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="loading">
        <p>Oops! Error fetching comments.</p>
      </div>
    );

  return (
    <div className="comment-card">
      <Link to={`/articles/${article_id}`}>
        <p>Back to article</p>
      </Link>
      {comments.map((comment) => (
        <div key={comment.comment_id}>
          <CommentCard comment={comment} />
          {loggedInUser.username === comment.author && (
            <button onClick={() => handleDelete(comment.comment_id)}>
              Delete Comment
            </button>
          )}
        </div>
      ))}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AllCommentsById;
