import { ADD_CATEGORY, INVALID_INPUT  } from "../constants/action-types";

const initialState = {
  categories: [],
  remoteCategories: [],
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
  if (action.type === "DATA_LOADED") {
    return Object.assign({}, state, {
      remoteCategories: state.remoteCategories.concat(action.payload)
    });
  }
  return state;
};

export default rootReducer;