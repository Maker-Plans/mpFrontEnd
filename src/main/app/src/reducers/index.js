import {
    ADD_CATEGORY
    , UPDATE_CATEGORY
    , DELETE_CATEGORY
    , CATEGORY_DATA_LOADED
    , INVALID_INPUT
    , API_CALL_FAILED,
} from '../constants/action-types';

import { loadCategories, addCategory, updateCategory, deleteCategory } from './CategoryReducer';

const initialState = {
    categories: [],
    error: '',
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_CATEGORY) {
        return addCategory(state, action);
    }
    if (action.type === UPDATE_CATEGORY) {
        return updateCategory(state, action);
    }
    if (action.type === DELETE_CATEGORY) {
        return deleteCategory(state, action);
    }
    if (action.type === CATEGORY_DATA_LOADED) {
        return loadCategories(state, action);
    }
    if (action.type === INVALID_INPUT) {
        return Object.assign({}, state, {
            error: `Invalid value for ${action.payload.field}`,
        });
    }
    if (action.type === API_CALL_FAILED) {
        return Object.assign({}, state, {
            error: action.payload,
        });
    }
    return state;
}

export default rootReducer;
