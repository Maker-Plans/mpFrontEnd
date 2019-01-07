import { ADD_CATEGORY
        , CATEGORY_DATA_LOADED
        , API_CALL_IN_PROGRESS
        , API_CALL_SUCCESS
        , API_CALL_FAILED } from "../constants/action-types";

import axios from "axios";

const API_KEY = "a9ab91fc-09f7-4d25-8ae6-8be3a28fa8e8";
const ROOT_URL = "http://localhost:8082/apis/category";

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

export function addCategory(dispatch, category) {
    dispatch({ type: API_CALL_IN_PROGRESS });
    category.categoryType = "ARTICLE";
    console.log(category);
    return axios.post(`${ROOT_URL}?api-key=${API_KEY}`, category)
        .then(function(response) {
            dispatch({ type: API_CALL_SUCCESS });
            dispatch({ type: ADD_CATEGORY, payload: response.data.category });
        })
        .catch(error => {
            // TODO: Introduce proper error handling
            dispatch({ type: API_CALL_FAILED });
            console.log(error.response)
        })
    ;
};