import { apiEndpoint } from "../apiEndpoint";
import fetchPatientClaims from "../reducers/fetchPatientClaims";

export const FETCH_CLAIMS_BEGIN = "FETCH_CLAIMS_BEGIN";
export const FETCH_CLAIMS_SUCCESS = "FETCH_CLAIMS_SUCCESS";
export const FETCH_CLAIMS_ERROR = "FETCH_CLAIMS_ERROR";

export const fetchClaimsBegin = () => ({ type: FETCH_CLAIMS_BEGIN });

export const fetchClaimsError = error => ({
  type: FETCH_CLAIMS_ERROR,
  payload: { error }
});

export const fetchClaimsSuccess = claims => ({
  type: FETCH_CLAIMS_SUCCESS,
  payload: { claims }
});

function fetchClaims(patientID) {
  return dispatch => {
    dispatch(fetchClaimsBegin());
    return fetch(`${apiEndpoint}/patients-claims/${patientID}`)
      .then(raw => handleErrors(raw))
      .then(response => response.json())
      .then(json => {
        dispatch(fetchClaimsSuccess(json.claims));
        return json.claims;
      })
      .catch(error => fetchClaimsError(error));
  };
}

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export default fetchClaims;
