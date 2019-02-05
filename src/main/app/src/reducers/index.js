import { normalize } from 'normalizr';

import { ADD_CATEGORY
       , CATEGORY_DATA_LOADED
       , INVALID_INPUT } from '../constants/action-types';

import { CATEGORY_SCHEMA } from '../constants/normalizr-constants';

const initialState = {
    categories: [],
    error: '',
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_CATEGORY) {
        return Object.assign({}, state, {
            categories: state.categories.concat(action.payload),
            error: '',
        });
    }
    if (action.type === INVALID_INPUT) {
        return Object.assign({}, state, {
            error: `Invalid value for ${action.payload.field}`,
        });
    }
    if (action.type === CATEGORY_DATA_LOADED) {
        console.log('normalizing:', { categories: action.payload });
        console.log('with', CATEGORY_SCHEMA);
        return Object.assign({}, state, {
            categories: normalize({ categories: action.payload }, CATEGORY_SCHEMA),
            error: '',
        });
    }
    return state;
}

export default rootReducer;
