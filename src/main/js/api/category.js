import axios from "axios";

const ROOT_URL = "http://localhost:8082/apis/category";
const API_KEY = "a9ab91fc-09f7-4d25-8ae6-8be3a28fa8e8";

export function getCategoriesForArticle() {
  return axios.get(`${ROOT_URL}?api-key=${API_KEY}&categoryType=ARTICLE`);
}