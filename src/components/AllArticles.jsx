import React, { useEffect, useState } from "react";
import { getArticles } from "../../api";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const topicNames = searchParams.get("topic");

  useEffect(() => {
    getArticles(topicNames)
      .then((articleData) => {
        setArticles(articleData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [topicNames]);

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
      {articles.map(({ title, article_img_url, article_id, topic }) => {
        return (
          <div key={article_id}>
            <Link to={`/articles/${article_id}`}>
              <h4 className="centered">{title}</h4>
              <div className="articles-body">
                <img src={article_img_url} className="images" />
              </div>
            </Link>
          </div>
        );
      })}
    </section>
  );
}
