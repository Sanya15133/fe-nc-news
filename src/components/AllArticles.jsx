import React, { useEffect, useState } from "react";
import { getArticles } from "../../api";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
// import { CarouselItem } from "react-bootstrap";
// import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AllArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((articleData) => {
      console.log(articleData, "in function");
      setArticles(articleData);
    });
  }, []);

  return (
    <section>
      <Header />
      {articles.map(({ title, article_img_url, article_id }) => {
        return (
          <div key={article_id} className="articles-body">
            <h3 className="centered">{title}</h3>
            <Link to={`/articles/${article_id}`}>
              <img src={article_img_url} className="images" />
            </Link>
          </div>
        );
      })}
      <Footer />
    </section>
  );
}
