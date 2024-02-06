import React, { useEffect, useState } from "react";
import { getArticles } from "../../api";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { CarouselItem } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
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
      <Carousel>
        {articles.map(({ title, article_img_url, article_id }) => {
          return (
            <CarouselItem key={article_id} className="carousel">
              <h3>{title}</h3>
              <div className="carousel-images">
                <Link to={`/articles/${article_id}`}>
                  <img src={article_img_url} />
                </Link>
              </div>
            </CarouselItem>
          );
        })}
      </Carousel>
      <Footer />
    </section>
  );
}
