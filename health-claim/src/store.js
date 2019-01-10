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
import fetchCredDef from "./reducers/fetchCredDef";
import register from "./reducers/register";
import verifySession from "./reducers/verifySession";
import sessionToken from "./reducers/sessionToken";
import logout from "./reducers/logout";
import setPredicates from "./reducers/setPredicates";
import createMasterSecret from "./reducers/createMasterSecret";
import storeRecord from "./reducers/storeRecord";
import fetchCreds from "./reducers/fetchCredentials";
import thirdPartyCalls from "./reducers/thirdPartyCalls";
import fetchCachedCreds from "./reducers/fetchCachedCreds";
import fetchCredReqStatus from "./reducers/fetchCredReqStatus";

const loggerMiddleware = createLogger();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["sessionToken", "setPredicates"]
};

const reducer = combineReducers({
  fetchPatientClaims,
  fetchNotifications,
  selectPatient,
  login,
  setPredicates,
  logout,
  register,
  verifySession,
  sessionToken,
  createMasterSecret,
  storeRecord,
  fetchCredDef,
  fetchCreds,
  thirdPartyCalls,
  fetchCachedCreds,
  fetchCredReqStatus
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
  return {
    store,
    persistor
  };
};
