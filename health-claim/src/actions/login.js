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

export const loginSuccess = response => ({
  type: LOGIN_SUCCESS,
  payload: { response }
});

export const logoutCall = () => ({
  type: LOGOUT
});

function login(username, password) {
  return dispatch => {
    dispatch(loginBegin());
    return fetch(
      `http://localhost:8000/doctor_verify/?username=${username}&password=${password}`
    )
      .then(raw => handleErrors(raw))
      .then(response => dispatch(loginSuccess(response)))
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
