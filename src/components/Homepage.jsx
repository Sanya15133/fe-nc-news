import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { getArticles } from "../../api";
import { Link } from "react-router-dom";

export default function Homepage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getArticles()
      .then((articleData) => {
        setArticles(articleData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
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
    <section>
      <Carousel>
        {articles.map(({ title, article_img_url, article_id }) => {
          return (
            <Carousel.Item key={article_id}>
              <Link to={`/articles/${article_id}`}>
                <h4 className="carousel-text">{title}</h4>
                <img src={article_img_url} className="carousel-pic" />
              </Link>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <div className="intro">
        <h3>Welcome Guest</h3>
        <p>
          You are currently visiting NC News! Take a look around the site and
          see what you can find...{" "}
        </p>{" "}
      </div>
    </section>
  );
}
