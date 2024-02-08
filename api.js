import axios from "axios";

export const getArticles = () => {
  let endpoint = "https://nc-news-lu0p.onrender.com/api/articles";

  return axios.get(endpoint).then((response) => {
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
      inc_votes: votes,
    })
    .then((response) => {
      return response.data.article;
    });
};
