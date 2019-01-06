import { ADD_CATEGORY } from "../constants/action-types";

const initialState = {
  categories: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_CATEGORY) {
    return Object.assign({}, state, {
      categories: state.categories.concat(action.payload)
    });
  }
  return state;
};

export default rootReducer;