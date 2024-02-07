import React, { useEffect, useState } from "react";
import { getArticles } from "../../api";
import { Link } from "react-router-dom";

export default function AllArticles() {
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
    <section className="fullCard">
      {articles.map(({ title, article_img_url, article_id }) => {
        return (
          <div key={article_id}>
            <Link to={`/articles/${article_id}`}>
              <div className="articles-body">
                <h4 className="centered">{title}</h4>
                <img src={article_img_url} className="images" />
              </div>
            </Link>
          </div>
        );
      })}
    </section>
  );
}
