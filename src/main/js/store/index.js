import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import { validateCategory } from "../middleware/CategoryValidator";
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
                rootReducer,
                storeEnhancers(applyMiddleware(validateCategory, thunk))
              );

export default store;