import { apiEndpoint } from "../apiEndpoint";
import logout from "./login";
import handleErrors from "./handleErrors";

export const FETCH_REQ_STATUS_BEGIN = "FETCH_REQ_STATUS_BEGIN";
export const FETCH_REQ_STATUS_SUCCESS = "FETCH_REQ_STATUS_SUCCESS";
export const FETCH_REQ_STATUS_ERROR = "FETCH_REQ_STATUS_ERROR";

export const fetchReqStatusBegin = () => ({
  type: FETCH_REQ_STATUS_BEGIN
});

export const fetchReqStatusError = error => ({
  type: FETCH_REQ_STATUS_ERROR,
  payload: { error }
});

export const fetchReqStatusSuccess = reqs => ({
  type: FETCH_REQ_STATUS_SUCCESS,
  payload: { reqs }
});

function fetchReqStatus(requesterDid) {
  return dispatch => {
    dispatch(fetchReqStatusBegin());
    return fetch(
      `${apiEndpoint}/credential_requests_status?requester_did=${requesterDid}`
    )
      .then(res => checkSessionValidity(res, dispatch))
      .then(raw => handleErrors(raw))
      .then(response => response.json())
      .then(json => {
        dispatch(fetchReqStatusSuccess(json));
        return json;
      })
      .catch(error => fetchReqStatusError(error));
  };
}

const checkSessionValidity = (responseJson, dispatch) => {
  if (responseJson.status === 401) {
    dispatch(logout());
  }
  return responseJson;
};

export default fetchReqStatus;
