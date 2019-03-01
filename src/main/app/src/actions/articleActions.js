import * as articleAPI from '../api/articleAPI';

export function getArticleData(categoryId) {
    return function (dispatch) {
        return articleAPI.getArticleData(dispatch, categoryId);
    };
}

export function addArticle(article) {
    return function (dispatch) {
        return articleAPI.addArticle(dispatch, article);
    };
}

export function updateArticle(article) {
    return function (dispatch) {
        return articleAPI.updateArticle(dispatch, article);
    };
}

export function deleteArticle(articleId) {
    return function (dispatch) {
        return articleAPI.deleteArticle(dispatch, articleId);
    };
}
