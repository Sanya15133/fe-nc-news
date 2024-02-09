import React, { useEffect, useState } from "react";
import { getArticles } from "../../api";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";

export default function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("");
  const [orderBy, setOrderBy] = useState("");

  const topicNames = searchParams.get("topic");
  const getSortBy = searchParams.get("sort_by");
  const getOrderBy = searchParams.get("order");

  function handleSortOnClick(event) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", event.target.value);
    console.log(event.target.value, "sort");
    setSortBy(event.target.value);
    setSearchParams(newParams);
  }

  function handleOrderOnClick(event) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", event.target.value);
    console.log(event.target.value, "order");
    setOrderBy(event.target.value);
    setSearchParams(newParams);
  }

  useEffect(() => {
    getArticles(topicNames, getSortBy, getOrderBy)
      .then((articleData) => {
        setArticles(articleData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [topicNames, getSortBy, getOrderBy]);

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
        <form className="sortby" name="sort_by" id="sortform">
          <label>Sort by </label>
          <select value={sortBy} onChange={handleSortOnClick}>
            <option value="created_at">Date</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
          </select>
        </form>
        <form className="orderby" name="order_by" id="orderform">
          <label>Order by </label>
          <select value={orderBy} onChange={handleOrderOnClick}>
            <option value="DESC">Descending</option>
            <option value="ASC">Ascending</option>
          </select>
        </form>
      </div>
      {articles.map(
        ({
          title,
          article_img_url,
          article_id,
          created_at,
          votes,
          comment_count,
        }) => {
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
                  <p>Comments: {comment_count}</p>
                </div>
              </div>
            </div>
          );
        }
      )}
    </section>
  );
}
