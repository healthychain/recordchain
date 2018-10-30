// import { apiEndpoint } from "../apiEndpoint";

export const REGISTER_BEGIN = "REGISTER_BEGIN";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const registerBegin = () => ({ type: REGISTER_BEGIN });

export const registerError = error => ({
  type: REGISTER_ERROR,
  payload: { error }
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS
});

function register(username, password) {
  return dispatch => {
    dispatch(registerBegin());
    return fetch(
      `http://localhost:8000/doctor_create?username=${username}&password=${password}&issuer_wallet_id=myWallet&issuer_wallet_key=wallet_key&issuer_did=Th7MpTaRZVRYnPiabds81Y`
    )
      .then(raw => handleErrors(raw))
      .then(response => dispatch(registerSuccess()))
      .catch(error => dispatch(registerError(error)));
  };
}

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export default register;
