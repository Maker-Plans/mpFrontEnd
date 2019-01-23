import { ADD_CATEGORY
       , CATEGORY_DATA_LOADED
       , API_CALL_IN_PROGRESS
       , API_CALL_SUCCESS
       , API_CALL_FAILED
       , INVALID_INPUT} from "../constants/action-types";

import { CATEGORY_SCHEMA } from '../constants/normalizr-constants';

import { normalize, schema } from 'normalizr';

const myData = { categories: [  {
                            "id" : "3d81d2bc-eb99-496c-8f90-e74c0a0a324a",
                            "name" : "lalala",
                            "description" : "jdfjfjf",
                            "categoryType" : "ARTICLE",
                            "leaf" : true
                          } , {
                              "id" : "138162dd-2f6f-4952-8c82-1750cdbd0f59",
                              "name" : "ewew",
                              "description" : "ewwewe",
                              "categoryType" : "ARTICLE",
                              "leaf" : true,
                              "subCategories": [{
                                      "id" : "1c5c4806-0bf6-45d2-9024-aea59713cfbe",
                                      "name" : "CategoryPage",
                                      "description" : ",mm",
                                      "categoryType" : "ARTICLE",
                                      "leaf" : true
                                    }]
                            }] };
const initialState = {
    categories: [],
    error: ""
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_CATEGORY) {
    return Object.assign({}, state, {
      categories: state.categories.concat(action.payload),
      error: ""
    });
  }
  if (action.type === INVALID_INPUT) {
    return Object.assign({}, state, {
      error: "Invalid value for " + action.payload.field
    });
  }
  if (action.type === CATEGORY_DATA_LOADED) {
  console.log("payload:",action.payload);
    return Object.assign({}, state, {
      categories: normalize({categories: action.payload}, CATEGORY_SCHEMA),
      error: ""
    });
  }
  return state;
};

export default rootReducer;