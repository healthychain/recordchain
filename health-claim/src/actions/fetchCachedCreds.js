import { apiEndpoint } from "../apiEndpoint";
import logout from "./login";
import handleErrors from "./handleErrors";

export const FETCH_CACHED_CREDS_BEGIN = "FETCH_CACHED_CREDS_BEGIN";
export const FETCH_CACHED_CREDS_SUCCESS = "FETCH_CACHED_CREDS_SUCCESS";
export const FETCH_CACHED_CREDS_ERROR = "FETCH_CACHED_CREDS_ERROR";

export const fetchCachedCredsBegin = () => ({
  type: FETCH_CACHED_CREDS_BEGIN
});

export const fetchCachedCredsError = error => ({
  type: FETCH_CACHED_CREDS_ERROR,
  payload: { error }
});

export const fetchCachedCredsSuccess = creds => ({
  type: FETCH_CACHED_CREDS_SUCCESS,
  payload: { creds }
});

function fetchCachedCreds(sessionID, proverUsername, proverDomain) {
  return dispatch => {
    dispatch(fetchCachedCredsBegin());
    return fetch(
      `${apiEndpoint}/credential_cache_view?token=${sessionID}&prover_username=${proverUsername}&prover_domain=${proverDomain}`
    )
      .then(res => checkSessionValidity(res, dispatch))
      .then(raw => handleErrors(raw))
      .then(response => response.json())
      .then(json => {
        // const cachedCreds = Object.keys(json).map(key => ({
        //   [key]: json[key]
        // }));
        dispatch(fetchCachedCredsSuccess(json));
        return json;
      })
      .catch(error => fetchCachedCredsError(error));
  };
}

const checkSessionValidity = (responseJson, dispatch) => {
  if (responseJson.status === 401) {
    dispatch(logout());
  }
  return responseJson;
};

export default fetchCachedCreds;
