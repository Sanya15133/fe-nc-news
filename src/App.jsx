import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllArticles from "./components/AllArticles";
import "bootstrap/dist/css/bootstrap.min.css";
import ArticleCard from "./components/ArticleCard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import CommentCard from "./components/CommentList";
import AllUsers from "./components/AllUsers";
import Header from "./components/Header";
import React, { useState } from "react";
import { UserContext } from "./components/UserContext";
import { useContext, useEffect } from "react";

function App() {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [loggedInUser, setLoggedInUser] = useState(
    !currentUser
      ? {
          username: "tickle122",
          name: "Tom Tickle",
          avatar_url:
            "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
        }
      : currentUser
  );

  return (
    <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/articles" element={<AllArticles />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/articles/:article_id" element={<ArticleCard />} />
          <Route
            path="/articles/:article_id/comments"
            element={<CommentCard />}
          />
          <Route path="/users" element={<AllUsers />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
