import React, { useEffect, useState } from "react";
import { getArticles } from "../../api";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { Loading } from "./Loading";

const PAGE_SIZE = 10; // Number of articles per page

export default function AllArticles() {
  // State variables
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(""); // New state for selected topic

  // Fetch articles effect
  useEffect(() => {
    setIsLoading(true);
    const topic = searchParams.get("topic");
    const sortBy = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order") || "DESC";

    getArticles(topic, sortBy, order, currentPage, PAGE_SIZE)
      .then((response) => {
        if (response && response.total_pages) {
          setArticles(response.articles);
          setTotalPages(response.total_pages);
          setIsError(false);
        } else {
          setIsError(true);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [searchParams, currentPage]);

  // Function to handle topic change
  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  // Function to handle sorting change
  const handleSortOnClick = (event) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", event.target.value);
    setSortBy(event.target.value);
    setCurrentPage(1); // Reset page number
    setSearchParams(newParams);
  };

  // Function to handle order change
  const handleOrderOnClick = (event) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", event.target.value);
    setOrderBy(event.target.value);
    setCurrentPage(1); // Reset page number
    setSearchParams(newParams);
  };

  // Function to handle pagination - Previous Page
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Function to handle pagination - Next Page
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <section className="fullCard">
      {/* Topic selection dropdown */}
      <div className="topic-selection">
        <label htmlFor="topic">Select a topic:</label>
        <select id="topic" value={selectedTopic} onChange={handleTopicChange}>
          <option value="">All</option>
          <option value="coding">Coding</option>
          <option value="football">Football</option>
          <option value="cooking">Cooking</option>
          {/* Add more options as needed */}
        </select>
      </div>
      {/* Sort and order controls */}
      <div className="sortorder">
        <form className="sortby" name="sort_by">
          <label htmlFor="sort">Sort by </label>
          <select value={sortBy} onChange={handleSortOnClick}>
            <option value="created_at">Date</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
          </select>
        </form>
        <br />
        <form className="orderby" name="order_by" id="order">
          <label htmlFor="order">Order by </label>
          <select value={orderBy} onChange={handleOrderOnClick} id="order">
            <option value="DESC">Descending</option>
            <option value="ASC">Ascending</option>
          </select>
        </form>
        <br />
      </div>
      {/* Post an article button */}
      <Link to={"/articles/post"}>
        <button>Post an article</button>
      </Link>
      {/* Render articles */}
      {isLoading && <Loading />}
      {isError && (
        <div className="loading">
          <p>Oops! Something went wrong!</p>
        </div>
      )}
      {articles.length > 0 ? (
        articles.map(
          ({
            title,
            article_img_url,
            article_id,
            created_at,
            votes,
            comment_count,
          }) => (
            <div key={article_id}>
              <div className="articles-body">
                <h4 className="centered">{title}</h4>
                <Link to={`/articles/${article_id}`}>
                  <img src={article_img_url} className="images" alt="Article" />
                </Link>
                <br />
                <br />
                <div className="date">
                  <p>Posted on {format(new Date(created_at), "PPPP")}</p>
                  <p>Votes: {votes}</p>
                  <p>Comments: {comment_count}</p>
                </div>
              </div>
            </div>
          )
        )
      ) : (
        <p>No articles found.</p>
      )}
      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </section>
  );
}
