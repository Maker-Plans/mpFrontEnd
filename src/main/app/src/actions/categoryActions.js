import * as categoryAPI from '../api/categoryAPI';

export function getCategoryData() {
    return function (dispatch) {
        return categoryAPI.getCategoryData(dispatch);
    };
}

export function addCategory(category) {
    return function (dispatch) {
        return categoryAPI.addCategory(dispatch, category);
    };
}

export function updateCategory(category) {
    return function (dispatch) {
        return categoryAPI.updateCategory(dispatch, category);
    };
}

export function deleteCategory(categoryId) {
    return function (dispatch) {
        return categoryAPI.deleteCategory(dispatch, categoryId);
    };
}
