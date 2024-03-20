import React from "react";
import { format } from "date-fns";

const CommentCard = ({ comment }) => {
  return (
    <section className="comment-card">
      <div key={comment.comment_id} className="comment">
        <p className="centered">
          Posted by {comment.author} on {format(comment.created_at, "PPPP")}
        </p>
        <p>{comment.body}</p>
        <p className="votes-info">Votes: {comment.votes}</p>
      </div>
    </section>
  );
};

export default CommentCard;
