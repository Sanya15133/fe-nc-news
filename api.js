import axios from "axios";

export const getArticles = () => {
  let endpoint = "https://nc-news-lu0p.onrender.com/api/articles";

  return axios.get(endpoint).then((response) => {
    console.log(response.data.articles, "here");
    return response.data.articles;
  });
};
