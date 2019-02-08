import axios from 'axios';

import {
    ADD_CATEGORY
    , UPDATE_CATEGORY
    , DELETE_CATEGORY
    , CATEGORY_DATA_LOADED
    , API_CALL_IN_PROGRESS
    , API_CALL_SUCCESS
    , API_CALL_FAILED,
} from '../constants/action-types';

const API_KEY = 'a9ab91fc-09f7-4d25-8ae6-8be3a28fa8e8';
const ROOT_URL = '/api/category';

export function getCategoryData(dispatch) {
    dispatch({ type: API_CALL_IN_PROGRESS });
    return axios.get(`${ROOT_URL}?api-key=${API_KEY}&categoryType=ARTICLE`)
        .then((response) => {
            dispatch({ type: API_CALL_SUCCESS });
            dispatch({ type: CATEGORY_DATA_LOADED, payload: response.data.categories });
        })
        .catch((error) => {
            // TODO: Introduce proper error handling
            dispatch({ type: API_CALL_FAILED, payload: error });
        })
        ;
}

export function addCategory(dispatch, category) {
    dispatch({ type: API_CALL_IN_PROGRESS });
    let data = { ...category };
    if (data.parentCategoryId === undefined) {
        data = { ...category, categoryType: 'ARTICLE' };
    }
    return axios.post(`${ROOT_URL}?api-key=${API_KEY}`, data)
        .then((response) => {
            dispatch({ type: API_CALL_SUCCESS });
            dispatch({ type: ADD_CATEGORY, payload: response.data.category });
        })
        .catch((error) => {
            // TODO: Introduce proper error handling
            dispatch({ type: API_CALL_FAILED, payload: error });
        })
        ;
}

export function updateCategory(dispatch, category) {
    dispatch({ type: API_CALL_IN_PROGRESS });
    let data = { ...category };
    if (data.parentCategoryId === undefined) {
        data = { ...category, categoryType: 'ARTICLE' };
    }
    return axios.put(`${ROOT_URL}/${category.id}?api-key=${API_KEY}`, data)
        .then((response) => {
            console.log('response', response);
            dispatch({ type: API_CALL_SUCCESS });
            dispatch({ type: UPDATE_CATEGORY, payload: response.data.category });
        })
        .catch((error) => {
            // TODO: Introduce proper error handling
            dispatch({ type: API_CALL_FAILED, payload: error });
        })
        ;
}

export function deleteCategory(dispatch, categoryId) {
    dispatch({ type: API_CALL_IN_PROGRESS });
    return axios.delete(`${ROOT_URL}/${categoryId}?api-key=${API_KEY}`)
        .then((response) => {
            console.log('response', response);
            console.log('removed', categoryId);
            dispatch({ type: API_CALL_SUCCESS });
            dispatch({ type: DELETE_CATEGORY, payload: categoryId });
        })
        .catch((error) => {
            // TODO: Introduce proper error handling
            dispatch({ type: API_CALL_FAILED, payload: error });
        })
        ;
}
