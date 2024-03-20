import { useContext, useState } from "react";
import { addCommentById } from "../../api";
import { UserContext } from "./UserContext";
import { useParams } from "react-router-dom";

export const CommentAdder = () => {
  const { loggedInUser } = useContext(UserContext);
  const [body, setBody] = useState("");
  const [isCommentPosted, setIsCommentPosted] = useState(false);
  const { article_id } = useParams();

  function handleCommentChange(event) {
    setBody(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    addCommentById(article_id, loggedInUser.username, body)
      .then((response) => {
        setIsCommentPosted(true);
        setBody("");
      })
      .catch((err) => {
        console.log("Something has gone wrong");
      });
  }

  return (
    <fieldset className="postform">
      <br />
      <h3>Join the discussion</h3>
      <form name="comment-form" onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <br />
          <input defaultValue={loggedInUser.username} readOnly />
        </label>
        <label htmlFor="comment">
          Comment:
          <br />
          <textarea
            required
            value={body}
            onChange={handleCommentChange}
          ></textarea>
        </label>
        <br />
        <button type="submit">Post a comment</button>
      </form>
      {isCommentPosted ? alert("Comment has been posted") : null}
    </fieldset>
  );
};
