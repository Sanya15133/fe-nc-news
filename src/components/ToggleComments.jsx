import React, { useState } from "react";

function ToggleableComment({ comments }) {
  const [showComment, setShowComment] = useState(false);

  const toggleComment = () => {
    setShowComment(!showComment);
  };

  return (
    <div>
      <button onClick={toggleComment}>
        {showComment ? "Hide Comments" : "Show Comments"}
      </button>
      {showComment ? <p>{comments}</p> : null}
    </div>
  );
}

export default ToggleableComment;
