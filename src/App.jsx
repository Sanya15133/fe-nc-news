import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllArticles from "./components/AllArticles";
import "bootstrap/dist/css/bootstrap.min.css";
import ArticleCard from "./components/ArticleCard";

function App() {
  return (
    <section>
      <Routes>
        <Route path="/articles" element={<AllArticles />} />
        <Route path="/articles/:article_id" element={<ArticleCard />} />
      </Routes>
    </section>
  );
}

export default App;
