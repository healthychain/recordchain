import { apiEndpoint } from "../apiEndpoint";
import handleErrors from "./handleErrors";

export const FETCH_CRED_BEGIN = "FETCH_CRED_BEGIN";
export const FETCH_CRED_SUCCESS = "FETCH_CRED_SUCCESS";
export const FETCH_CRED_ERROR = "FETCH_CRED_ERROR";

export const fetchCredsBegin = () => ({
  type: FETCH_CRED_BEGIN
});

export const fetchCredsError = () => ({
  type: FETCH_CRED_ERROR
});

export const fetchCredsSuccess = credentials => ({
  type: FETCH_CRED_SUCCESS,
  payload: { credentials }
});

function fetchCreds(sessionID) {
  return dispatch => {
    dispatch(fetchCredsBegin());
    return fetch(`${apiEndpoint}/get_credentials?token=${sessionID}`)
      .then(raw => handleErrors(raw))
      .then(response => response.json())
      .then(json => {
        dispatch(fetchCredsSuccess(json));
      })
      .catch(error => fetchCredsError());
  };
}

export default fetchCreds;
