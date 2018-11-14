import { apiEndpoint } from "../apiEndpoint";
import handleErrors from "./handleErrors";

export const TP_REQUEST_BEGIN = "TP_REQUEST_BEGIN";
export const TP_REQUEST_SUCCESS = "TP_REQUEST_SUCCESS";
export const TP_REQUEST_ERROR = "TP_REQUEST_ERROR";

export const TP_VIEW_BEGIN = "TP_VIEW_BEGIN";
export const TP_VIEW_SUCCESS = "TP_VIEW_SUCCESS";
export const TP_VIEW_ERROR = "TP_VIEW_ERROR";

export const tpRequestBegin = () => ({
  type: TP_REQUEST_BEGIN
});

export const tpRequestSuccess = () => ({
  type: TP_REQUEST_SUCCESS
});

export const tpRequestError = () => ({
  type: TP_REQUEST_ERROR
});

export const tpViewBegin = () => ({
  type: TP_VIEW_BEGIN
});

export const tpViewSuccess = data => ({
  type: TP_VIEW_SUCCESS,
  payload: data
});

export const tpViewError = () => ({
  type: TP_VIEW_ERROR
});

function tpRequest(userDID, domain, attrs) {
  return dispatch => {
    //Agent_domain - my domain
    //Req_attrs - attributes requested, comma separated
    dispatch(tpRequestBegin());
    return fetch(`${domain}/proof_request_request?user_did=${userDID}&`);
  };
}
