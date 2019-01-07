import { ADD_CATEGORY
        , CATEGORY_DATA_LOADED
        , API_CALL_IN_PROGRESS
        , API_CALL_SUCCESS
        , API_CALL_FAILED } from "../constants/action-types";

import axios from "axios";

const ROOT_URL = "http://localhost:8082/apis/category";
const API_KEY = "a9ab91fc-09f7-4d25-8ae6-8be3a28fa8e8";

export function getCategoryData(dispatch) {
    dispatch({ type: API_CALL_IN_PROGRESS });
    return axios.get(`${ROOT_URL}?api-key=${API_KEY}&categoryType=ARTICLE`)
        .then(function(response) {
            dispatch({ type: API_CALL_SUCCESS });
            dispatch({ type: CATEGORY_DATA_LOADED, payload: response.data.categories });
        })
        .catch(error => {
            // TODO: Introduce proper error handling
            dispatch({ type: API_CALL_FAILED });
            console.log(error.response)
        })
    ;
}

export function addCategory(payload) {
    // TODO: call the createCategory or updateCategry on the category API.
    return { type: ADD_CATEGORY, payload }
};