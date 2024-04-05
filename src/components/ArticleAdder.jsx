import { useContext, useState } from "react";
import { addArticle } from "../../api";
import { UserContext } from "./UserContext";

export const ArticleAdder = () => {
  const { loggedInUser } = useContext(UserContext);
  const [isArticlePosted, setIsArticlePosted] = useState(false);
  const [newArticle, setNewArticle] = useState({
    author: loggedInUser.username,
    title: "",
    body: "",
    topic: "",
    image: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewArticle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    addArticle(newArticle)
      .then((response) => {
        console.log(response.data, "in article adder");
        setIsArticlePosted(true);
        setNewArticle({
          ...newArticle,
          title: "",
          body: "",
          topic: "",
          image: "",
        });
      })
      .catch((err) => {
        console.log(err, "Something has gone wrong");
      });
  }

  return (
    <fieldset className="article-form">
      <br />
      <h3>Post an article!</h3>
      <form name="article-form" onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <br />
          <input defaultValue={loggedInUser.username} readOnly />
        </label>
        <label htmlFor="title">
          Title:
          <br />
          <input
            name="title"
            required
            value={newArticle.title}
            onChange={handleInputChange}
          ></input>
        </label>
        <label htmlFor="topic">
          Topic:
          <br />
          <input
            name="topic"
            value={newArticle.topic}
            onChange={handleInputChange}
          ></input>
        </label>
        <label htmlFor="body">
          Body:
          <br />
          <textarea
            name="body"
            required
            value={newArticle.body}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <label htmlFor="article_image_url">
          Image:
          <br />
          <input
            name="image"
            value={newArticle.image}
            onChange={handleInputChange}
          ></input>
        </label>
        <br />
        <br />
        <button type="submit">Post</button>
      </form>
      {isArticlePosted ? alert("Article has been posted") : null}
    </fieldset>
  );
};
