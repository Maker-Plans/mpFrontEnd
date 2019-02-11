import { normalize } from 'normalizr';

import {
    ADD_CATEGORY
    , UPDATE_CATEGORY
    , DELETE_CATEGORY
    , CATEGORY_DATA_LOADED
    , INVALID_INPUT
    , API_CALL_FAILED,
} from '../constants/action-types';

import { CATEGORY_SCHEMA } from '../constants/normalizr-constants';

const initialState = {
    categories: [],
    error: '',
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_CATEGORY) {
        const entities = { ...state.categories.entities };
        const result = { ...state.categories.result };
        if (action.payload.parentCategoryId === undefined) {
            result.categories = result.categories.concat(action.payload.id);
        } else {
            entities.categories.get(action.payload.parentCategoryId).categories =
                entities.categories.get(action.payload.parentCategoryId).categories.concat(action.payload.id);
        }
        entities.categories[action.payload.id] = action.payload;
        return Object.assign({}, state, {
            categories: { entities, result },
            error: '',
        });
    }
    if (action.type === UPDATE_CATEGORY) {
        const entities = { ...state.categories.entities };
        const result = { ...state.categories.result };
        const oldCategory = entities.categories[action.payload.id];
        // cleanup old entry in the tree
        if (oldCategory.parentCategoryId === undefined && action.payload.parentCategoryId !== undefined) {
            // if the old version was in the root, and the new version is not,
            // remove it from the root and add it to the correct parent
            result.categories = result.categories.filter(value => value !== oldCategory.id);
            entities.categories.get(action.payload.parentCategoryId).categories =
                entities.categories.get(action.payload.parentCategoryId).categories.concat(action.payload.id);
        } else if (oldCategory.parentCategoryId !== undefined && action.payload.parentCategoryId === undefined) {
            // if the old version is not in the root and the new version is,
            // remove it from the old parent and place it in the root
            entities.categories.get(oldCategory.parentCategoryId).categories.splice(oldCategory.id, 1);
            result.categories = result.categories.concat(action.payload.id);
        } else if (oldCategory.parentCategoryId !== undefined
            && oldCategory.parentCategoryId !== action.payload.parentCategoryId) {
            // if the old version was not in the root, en the new parent is different from the old parent,
            // move it to the new parent.
            entities.categories.get(oldCategory.parentCategoryId).categories.splice(oldCategory.id, 1);
            entities.categories.get(action.payload.parentCategoryId).categories =
                entities.categories.get(action.payload.parentCategoryId).categories.concat(action.payload.id);
        }
        entities.categories[action.payload.id] = action.payload;
        return Object.assign({}, state, {
            categories: { entities, result },
            error: '',
        });
    }
    if (action.type === DELETE_CATEGORY) {
        const entities = { ...state.categories.entities };
        const oldCategory = entities.categories[action.payload];
        const result = { ...state.categories.result };
        if (oldCategory.parentCategoryId === undefined) {
            // if the old version was in the root,
            // remove it from the root
            result.categories = result.categories.filter(value => value !== action.payload);
        } else if (oldCategory.parentCategoryId !== undefined) {
            // if the old version is not in the root,
            // remove it from the old parent
            entities.categories.get(oldCategory.parentCategoryId).categories.splice(action.payload, 1);
        }
        return Object.assign({}, state, {
            categories: { entities, result },
            error: '',
        });
    }
    if (action.type === CATEGORY_DATA_LOADED) {
        return Object.assign({}, state, {
            categories: normalize({ categories: action.payload }, CATEGORY_SCHEMA),
            error: '',
        });
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
