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

export const tpViewSuccess = proof => ({
  type: TP_VIEW_SUCCESS,
  payload: proof
});

export const tpViewError = () => ({
  type: TP_VIEW_ERROR
});

export function tpRequest(userDID, domain, req_attrs, req_pred) {
  const data = {
    prover_did: userDID,
    agent_domain: domain,
    req_attrs,
    req_pred
  };
  return dispatch => {
    //Agent_domain - my domain
    console.log("DATA");
    console.log(data);
    dispatch(tpRequestBegin());
    return fetch(`http://localhost:8000/proof_request_request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(raw => handleErrors(raw))
      .then(dispatch(tpRequestSuccess()))
      .catch(error => dispatch(tpRequestError()));
  };
}

export function tpView(userDID) {
  return dispatch => {
    dispatch(tpViewBegin());
    return fetch(`${apiEndpoint}/proof_view?prover_did=${userDID}`)
      .then(raw => handleErrors(raw))
      .then(response => response.json())
      .then(json => dispatch(tpViewSuccess(json)))
      .catch(error => dispatch(tpViewError()));
  };
}
