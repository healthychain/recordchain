import { apiEndpoint } from "../apiEndpoint";
import handleErrors from "./handleErrors";
import { storeToken, deleteInvalidToken } from "./sessionToken";
import { logoutCall } from "./login";

export const VERIFY_BEGIN = "VERIFY_BEGIN";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const VERIFY_ERROR = "VERIFY_ERROR";
export const VERIFY_DOCTOR = "VERIFY_DOCTOR";
export const VERIFY_PATIENT = "VERIFY_PATIENT";

export const verifyBegin = () => ({ type: VERIFY_BEGIN });

export const verifyError = () => ({
  type: VERIFY_ERROR
});

export const verifySuccess = () => ({
  type: VERIFY_SUCCESS
});

export const verifySession = token => {
  return dispatch => {
    dispatch(verifyBegin());
    return token
      ? fetch(`${apiEndpoint}/verify_session/?token=${token}`)
          .then(raw => {
            return handleErrors(raw);
          })
          .then(json => {
            dispatch(verifySuccess());
          })
          .catch(error => {
            dispatch(verifyError());
            dispatch(logoutCall());
            dispatch(deleteInvalidToken());
          })
      : dispatch(verifyError()) &&
          dispatch(logoutCall()) &&
          dispatch(deleteInvalidToken());
  };
};

export default verifySession;
