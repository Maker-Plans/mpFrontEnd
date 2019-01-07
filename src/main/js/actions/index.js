import { ADD_CATEGORY } from "../constants/action-types";

import * as categoryApi from "../api/category";

export function getCategoryData() {
  return function(dispatch) {
    return categoryApi.getCategoriesForArticle()
      .then(response => response.data)
      .then(data => {
        dispatch({ type: "DATA_LOADED", payload: data.categories });
      });
  };
}

export function addCategory(payload) {
    console.log("adding payload");
    console.log(payload);
    // TODO: call the createCategory or updateCategry on the category API.
    return { type: ADD_CATEGORY, payload }
};