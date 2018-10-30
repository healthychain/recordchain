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

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});

export const logoutCall = () => ({
  type: LOGOUT
});

function login(username, password) {
  return dispatch => {
    dispatch(loginBegin());
    return fetch(
      `http://localhost:8000/patient_verify/?username=${username}&password=${password}`
    )
      .then(raw => handleErrors(raw))
      .then(response => dispatch(loginSuccess()))
      .catch(error => loginError(error));
  };
}

function logout() {
  return dispatch => dispatch(logoutCall());
}

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export default login;
