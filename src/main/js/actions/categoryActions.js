import { ADD_CATEGORY } from "../constants/action-types";

import * as categoryAPI from "../api/categoryAPI";

export function getCategoryData() {
    return function(dispatch) {
        return categoryAPI.getCategoryData(dispatch);
    };
}

export function addCategory(payload) {
    // TODO: call the createCategory or updateCategory on the category API.
    return { type: ADD_CATEGORY, payload }
};