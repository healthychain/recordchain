import { apiEndpoint } from "../apiEndpoint";
import handleErrors from "./handleErrors";
import { storeToken } from "./sessionToken";
import { verifySuccess, verifyError } from "./verifySession";

export const LOGIN_BEGIN = "LOGIN_BEGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";

export const loginBegin = () => ({ type: LOGIN_BEGIN });

export const loginError = error => ({
  type: LOGIN_ERROR
});

export const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  payload: { token }
});

export const logoutCall = () => ({
  type: LOGOUT
});

function login(username, password, account_type) {
  return dispatch => {
    console.log("LOGGING IN NOW");
    dispatch(loginBegin());
    return fetch(
      `${apiEndpoint}/${account_type}_verify/?username=${username}&password=${password}`
    )
      .then(raw => handleErrors(raw))
      .then(response => response.json())
      .then(json => {
        dispatch(verifySuccess());
        dispatch(loginSuccess(json.token));
        dispatch(storeToken(json.token));
      })

      .catch(error => dispatch(loginError(error)));
  };
}

export function logout() {
  return dispatch => {
    dispatch(verifyError());
  };
}

export default login;
