import { ADD_CATEGORY } from "../constants/action-types";

export function addCategory(payload) {
console.log("adding payload");
console.log(payload);
// TODO: call the createCategory or updateCategry on the category API.
  return { type: ADD_CATEGORY, payload }
};