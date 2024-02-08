import axios from "axios";

export const getArticles = (topic) => {
  let endpoint = "https://nc-news-lu0p.onrender.com/api/articles";

  if (topic !== undefined) {
    endpoint += `?topic=${topic}`;
  }

  console.log(topic, "topic in api js");

  return axios.get(endpoint).then((response) => {
    console.log(response.data.articles);
    return response.data.articles;
  });
};

export const getArticleById = (article_id) => {
  let endpoint = `https://nc-news-lu0p.onrender.com/api/articles/${article_id}`;

  return axios.get(endpoint).then((response) => {
    return response.data.article;
  });
};

export const getCommentsById = (article_id) => {
  let endpoint = `https://nc-news-lu0p.onrender.com/api/articles/${article_id}/comments`;

  return axios.get(endpoint).then((response) => {
    return response.data.articles;
  });
};

export const updateVotesById = (article_id, votes) => {
  return axios
    .patch(`https://nc-news-lu0p.onrender.com/api/articles/${article_id}`, {
      votes: votes,
    })
    .then((response) => {
      return response.data.article;
    });
};
