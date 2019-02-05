// import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

// Note: this API requires redux@>=3.1.0

export default createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk),
    ));
