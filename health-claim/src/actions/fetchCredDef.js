import { apiEndpoint } from "../apiEndpoint";
import handleErrors from "./handleErrors";

export const FETCH_CRED_DEF_BEGIN = "FETCH_CRED_DEF_BEGIN";
export const FETCH_CRED_DEF_SUCCESS = "FETCH_CRED_DEF_SUCCESS";
export const FETCH_CRED_DEF_ERROR = "FETCH_CRED_DEF_ERROR";
export const FETCH_CRED_DEF_TYPES_BEGIN = "FETCH_CRED_DEF_TYPES_BEGIN";
export const FETCH_CRED_DEF_TYPES_SUCCESS = "FETCH_CRED_DEF_TYPES_SUCCESS";
export const FETCH_CRED_DEF_TYPES_ERROR = "FETCH_CRED_DEF_TYPES_ERROR";

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

export const fetchCredDefTypesBegin = () => ({
  type: FETCH_CRED_DEF_TYPES_BEGIN
});

export const fetchCredDefTypesError = () => ({
  type: FETCH_CRED_DEF_TYPES_ERROR
});

export const fetchCredDefTypesSuccess = attrs_types => ({
  type: FETCH_CRED_DEF_TYPES_SUCCESS,
  payload: { attrs_types }
});

function fetchCredDef() {
  return dispatch => {
    dispatch(fetchCredDefBegin());
    return fetch(`${apiEndpoint}/get_public_schema`)
      .then(raw => handleErrors(raw))
      .then(raw => raw.json())
      .then(json => {
        dispatch(fetchCredDefSuccess(json.attrs));
      })
      .catch(error => fetchCredDefError());
  };
}

export function fetchCredDefTypes() {
  return dispatch => {
    dispatch(fetchCredDefTypesBegin());
    return fetch(`${apiEndpoint}/get_public_schema_types`)
      .then(raw => handleErrors(raw))
      .then(raw => raw.json())
      .then(json => {
        dispatch(fetchCredDefTypesSuccess(json.attrs));
      })
      .catch(error => fetchCredDefTypesError());
  };
}

export default fetchCredDef;
