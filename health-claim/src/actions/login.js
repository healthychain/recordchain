import { apiEndpoint } from "../apiEndpoint";

// import { apiEndpoint } from "../apiEndpoint";

export const LOGIN_BEGIN = "LOGIN_BEGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";

export const loginBegin = () => ({ type: LOGIN_BEGIN });

export const loginError = error => ({
  type: LOGIN_ERROR,
  payload: { error }
});

export const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  payload: { token }
});

export const logoutCall = () => ({
  type: LOGOUT
});

function login(username, password) {
  return dispatch => {
    dispatch(loginBegin());
    return fetch(
      `${apiEndpoint}/doctor_verify/?username=${username}&password=${password}`
    )
      .then(raw => handleErrors(raw))
      .then(response => response.json())
      .then(json => dispatch(loginSuccess(json.token)))
      .catch(error => loginError(error));
  };
}

export function logout() {
  return dispatch => dispatch(logoutCall());
}

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export default login;
