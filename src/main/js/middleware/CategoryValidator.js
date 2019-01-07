import { ADD_CATEGORY, INVALID_INPUT } from "../constants/action-types";

const forbiddenWords = ["spam", "money"];

export function validateCategory({ dispatch }) {
  return function(next) {
    return function(action) {
      // do your stuff
      if (action.type === ADD_CATEGORY) {
        const foundWord = forbiddenWords.filter(word =>
          action.payload.name.includes(word)
        );
        if (foundWord.length) {
          return dispatch({ type: INVALID_INPUT, payload: {field: "name"} });
        }
      }
      return next(action);
    };
  };
}