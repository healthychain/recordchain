import { combineReducers } from "redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
// import { composeWithDevTools } from "redux-devtools-extension";
// redux logger dev tools

import fetchPatientClaims from "./reducers/fetchPatientClaims";
import selectPatient from "./reducers/selectPatient";

const loggerMiddleware = createLogger();

const reducer = combineReducers({ fetchPatientClaims, selectPatient });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = () => {
  return createStore(
    reducer,
    // allow for redux dev tool extension in chrome
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
      )
    )
  );
};

export default Store;
