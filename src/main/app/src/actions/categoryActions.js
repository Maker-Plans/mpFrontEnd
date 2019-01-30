import * as categoryAPI from '../api/categoryAPI';

export function getCategoryData() {
    return function (dispatch) {
        return categoryAPI.getCategoryData(dispatch);
    };
}

export function addCategory(category) {
    // TODO: call the createCategory or updateCategory on the category API.
    return function (dispatch) {
        return categoryAPI.addCategory(dispatch, category);
    };
}
