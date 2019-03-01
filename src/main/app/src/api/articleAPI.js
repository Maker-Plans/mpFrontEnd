import axios from 'axios';

import {
    ADD_ARTICLE,
    API_CALL_FAILED,
    API_CALL_IN_PROGRESS,
    API_CALL_SUCCESS,
    ARTICLE_DATA_LOADED,
    DELETE_ARTICLE,
    UPDATE_ARTICLE,
} from '../constants/action-types';

const API_KEY = 'a9ab91fc-09f7-4d25-8ae6-8be3a28fa8e8';
const ROOT_URL = '/api/content/article';

export function getArticleData(dispatch, categoryId) {
    dispatch({ type: API_CALL_IN_PROGRESS });
    return axios.get(`${ROOT_URL}?api-key=${API_KEY}&categoryId=${categoryId}`)
        .then((response) => {
            if (response.data.responseCode === 200) {
                dispatch({ type: API_CALL_SUCCESS });
                dispatch({ type: ARTICLE_DATA_LOADED, payload: { categoryId, articles: response.data.articles } });
            } else {
                dispatch({ type: API_CALL_FAILED, payload: response.data.message });
            }
        })
        .catch((error) => {
            dispatch({ type: API_CALL_FAILED, payload: error });
        })
        ;
}

export function addArticle(dispatch, article) {
    dispatch({ type: API_CALL_IN_PROGRESS });
    console.log('adding article', article);
    return axios.post(`${ROOT_URL}?api-key=${API_KEY}`, { ...article })
        .then((response) => {
            if (response.data.responseCode === 201) {
                dispatch({ type: API_CALL_SUCCESS });
                dispatch({ type: ADD_ARTICLE, payload: response.data.article });
            } else {
                dispatch({ type: API_CALL_FAILED, payload: response.data.message });
            }
        })
        .catch((error) => {
            dispatch({ type: API_CALL_FAILED, payload: error });
        })
        ;
}

export function updateArticle(dispatch, article) {
    dispatch({ type: API_CALL_IN_PROGRESS });
    return axios.put(`${ROOT_URL}/${article.id}?api-key=${API_KEY}`, { ...article })
        .then((response) => {
            if (response.data.responseCode === 301) {
                dispatch({ type: API_CALL_SUCCESS });
                dispatch({ type: UPDATE_ARTICLE, payload: response.data.article });
            } else {
                dispatch({ type: API_CALL_FAILED, payload: response.data.message });
            }
        })
        .catch((error) => {
            dispatch({ type: API_CALL_FAILED, payload: error });
        })
        ;
}

export function deleteArticle(dispatch, articleId) {
    dispatch({ type: API_CALL_IN_PROGRESS });
    return axios.delete(`${ROOT_URL}/${articleId}?api-key=${API_KEY}`)
        .then((response) => {
            if (response.data.responseCode === 410) {
                dispatch({ type: API_CALL_SUCCESS });
                dispatch({ type: DELETE_ARTICLE, payload: articleId });
            } else {
                dispatch({ type: API_CALL_FAILED, payload: response.data.message });
            }
        })
        .catch((error) => {
            dispatch({ type: API_CALL_FAILED, payload: error });
        })
        ;
}
