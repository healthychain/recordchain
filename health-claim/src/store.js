import { combineReducers } from "redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

import fetchNotifications from "./reducers/fetchNotifications";
import fetchPatientClaims from "./reducers/fetchPatientClaims";
import selectPatient from "./reducers/selectPatient";
import login from "./reducers/login";
import register from "./reducers/register";

const loggerMiddleware = createLogger();

const persistConfig = {
  key: "root",
  storage,
  whiteList: []
};

const reducer = combineReducers({
  fetchPatientClaims,
  fetchNotifications,
  selectPatient,
  login,
  register
});

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  let store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
      )
    )
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
