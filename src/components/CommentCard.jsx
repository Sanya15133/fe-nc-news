import { format } from "date-fns";
import { updateCommentVotesById } from "../../api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CommentCard = ({ comment }) => {
  const [votes, setVotes] = useState(0);

  const { comment_id } = useParams();

  function handleClick(event) {
    setVotes((currVotes) => {
      return (currVotes += +event);
    });
    updateCommentVotesById(comment_id, event);
  }

  return (
    <section className="comment-card">
      <div key={comment.comment_id} className="comment">
        <p className="centered">
          Posted by {comment.author} on {format(comment.created_at, "PPPP")}
        </p>
        <p>{comment.body}</p>
        <div className="votes">
          {votes}
          <button onClick={() => handleClick(1)}>👍🏼</button>
          <button onClick={() => handleClick(-1)}>👎🏼</button>
          <p className="votes-info">Votes: {comment.votes}</p>
        </div>
      </div>
    </section>
  );
};

export default CommentCard;
