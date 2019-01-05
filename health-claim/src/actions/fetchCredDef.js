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

export const fetchCredDefSuccess = attrs => ({
  type: FETCH_CRED_DEF_SUCCESS,
  payload: { attrs }
});

function fetchCredDef() {
  return dispatch => {
    dispatch(fetchCredDefBegin());
    return (
      fetch(`${apiEndpoint}/get_public_schema`)
        .then(raw => handleErrors(raw))
        .then(raw => raw.json())
        // .then(file => console.log(file.attrs))
        .then(json => {
          dispatch(fetchCredDefSuccess(json.attrs));
        })
        .catch(error => fetchCredDefError())
    );
  };
}

export default fetchCredDef;
