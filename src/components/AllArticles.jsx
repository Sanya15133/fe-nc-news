import React, { useEffect, useState } from "react";
import { getArticles } from "../../api";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { format, formatDate } from "date-fns";

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
      <div className="sortorder">
        <form className="sortby">
          <label>Sort by </label>
          <select>
            <option>Date</option>
            <option>Comments</option>
            <option>Votes</option>
          </select>
        </form>
        <section className="orderby">
          <form>
            <label>Order by </label>
            <select>
              <option>Ascending</option>
              <option>Descending</option>
            </select>
          </form>
        </section>
      </div>
      {articles.map(
        ({ title, article_img_url, article_id, topic, created_at, votes }) => {
          return (
            <div key={article_id}>
              <div className="articles-body">
                <h4 className="centered">{title}</h4>
                <Link to={`/articles/${article_id}`}>
                  <img src={article_img_url} className="images" />
                </Link>
                <br></br>
                <br></br>
                <div className="date">
                  <p>Posted on {format(created_at, "PPPP")}</p>
                  <p>Votes: {votes}</p>
                </div>
              </div>
            </div>
          );
        }
      )}
    </section>
  );
}
