import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllArticles from "./components/AllArticles";
import "bootstrap/dist/css/bootstrap.min.css";
import ArticleCard from "./components/ArticleCard";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";

function App() {
  return (
    <section>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/articles" element={<AllArticles />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/articles/:article_id" element={<ArticleCard />} />
      </Routes>
      <Footer />
    </section>
  );
}

export default App;
