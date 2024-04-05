import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-lu0p.onrender.com/api",
});

export const getArticles = (topic, sort_by, order) => {
  return newsApi
    .get("/articles", {
      params: { topic, sort_by, order },
    })
    .then((response) => {
      return response.data.articles;
    });
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

export const getUsers = () => {
  return newsApi.get("/users").then((response) => {
    return response.data.users;
  });
};

export const updateArticleVotesById = (article_id, votes) => {
  return newsApi
    .patch(`/articles/${article_id}`, {
      inc_votes: votes,
    })
    .then((response) => {
      return response.data.article;
    });
};

export const addCommentById = (article_id, username, body) => {
  console.log(username, body);

  return newsApi
    .post(`/articles/${article_id}/comments`, {
      username,
      body,
    })
    .then((response) => {
      console.log(response, "response");
      return response.data.comment;
    });
};

export const deleteCommentByCommentId = (comment_id) => {
  return newsApi.delete(`/comments/${comment_id}`).then((response) => {
    return response.data.comment;
  });
};

export const updateCommentVotesById = (comment_id, votes) => {
  return newsApi
    .patch(`/comments/${comment_id}`, {
      inc_votes: votes,
    })
    .then((response) => {
      return response.data.comment;
    });
};

export const addArticle = (newArticle) => {
  console.log(newArticle, "in ai js function");

  return newsApi.post(`/articles`, newArticle).then((response) => {
    console.log(response.data.article, "response here");
    return response.data.article;
  });
};

export const deleteArticleById = (article_id) => {
  console.log(article_id, "in ai js function");

  return newsApi.delete(`/articles/${article_id}`).then((response) => {
    return response.data.article;
  });
};

export const getTopics = () => {
  return newsApi.get("/topics").then((response) => {
    return response.data.topics;
  });
};
