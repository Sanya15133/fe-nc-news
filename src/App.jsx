import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllArticles from "./components/AllArticles";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <section>
      <Routes>
        <Route path="/articles" element={<AllArticles />} />
      </Routes>
    </section>
  );
}

export default App;
