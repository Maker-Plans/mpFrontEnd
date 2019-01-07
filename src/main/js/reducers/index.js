import { ADD_CATEGORY
       , CATEGORY_DATA_LOADED
       , API_CALL_IN_PROGRESS
       , API_CALL_SUCCESS
       , API_CALL_FAILED
       , INVALID_INPUT} from "../constants/action-types";

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
    return Object.assign({}, state, {
      categories: state.categories.concat(action.payload),
      error: ""
    });
  }
  return state;
};

export default rootReducer;