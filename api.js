import axios from "axios";

export const getArticles = () => {
  let endpoint = "https://nc-news-lu0p.onrender.com/api/articles";

  return axios.get(endpoint).then((response) => {
    console.log(response.data.articles, "here");
    return response.data.articles;
  });
};

export const getArticleById = (article_id) => {
  let endpoint = `https://nc-news-lu0p.onrender.com/api/articles/${article_id}`;

  return axios.get(endpoint).then((response) => {
    console.log(response.data.article, "here");
    return response.data.article;
  });
};

// export const getTopics = () => {
//   let endpoint = "https://nc-news-lu0p.onrender.com/api/topics";

//   return axios.get(endpoint).then((response) => {
//     console.log(response.data.topics.slug, "here");
//     return response.data.topics.slug
//   });
// };
