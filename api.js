import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-lu0p.onrender.com/api",
});

export const getArticles = (topic, sort_by, order_by) => {
  return newsApi
    .get("/articles", {
      params: {
        topic: topic,
        sort_by: sort_by,
        order_by: order_by,
      },
    })
    .then((response) => {
      return response.data.articles;
    });
=======

};

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then((response) => {
    return response.data.article;
  });
};

export const getCommentsById = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data.articles;
  });
};

export const updateVotesById = (article_id, votes) => {
  return newsApi
    .patch(`/articles/${article_id}`, {
      inc_votes: votes,
    })
    .then((response) => {
      return response.data.article;
    });
};
