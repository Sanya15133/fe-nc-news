import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { getArticleById } from "../../api";
import { useParams } from "react-router-dom";

export default function ArticleCard() {
  const [article, setArticle] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id).then((articleData) => {
      console.log(articleData, "in function");
      setArticle(articleData);
    });
  }, [article_id]);

  return (
    <section>
      <Header />
      <div key={article.article_id}>
        <h3>{article.title}</h3>
        <img src={article.article_img_url} />
        <p>{article.body}</p>
      </div>
      <Footer />
    </section>
  );
}
