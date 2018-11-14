import { apiEndpoint } from "../apiEndpoint";
import handleErrors from "./handleErrors";

export const FETCH_CRED_DEF_BEGIN = "FETCH_CRED_DEF_BEGIN";
export const FETCH_CRED_DEF_SUCCESS = "FETCH_CRED_DEF_SUCCESS";
export const FETCH_CRED_DEF_ERROR = "FETCH_CRED_DEF_ERROR";

export const fetchCredDefBegin = () => ({
  type: FETCH_CRED_DEF_BEGIN
});

export const fetchCredDefError = () => ({
  type: FETCH_CRED_DEF_ERROR
});

export const fetchCredDefSuccess = () => ({
  type: FETCH_CRED_DEF_SUCCESS
});

function fetchCredDef() {
  return dispatch => {
    dispatch(fetchCredDefBegin());
    return fetch(`${apiEndpoint}/cred_def`)
      .then(raw => handleErrors(raw))
      .then(json => {
        dispatch(fetchCredDefSuccess(json.credDef));
      })
      .catch(error => fetchCredDefError());
  };
}

export default fetchCredDef;
