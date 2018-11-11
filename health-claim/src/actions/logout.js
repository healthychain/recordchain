import { apiEndpoint } from "../apiEndpoint";
import handleErrors from "./handleErrors";
import { deleteInvalidToken } from "./sessionToken";
import { invalidateSession } from "./verifySession";
import { logoutCall } from "./login";

export const LOGOUT_BEGIN = "LOGOUT_BEGIN";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const logoutBegin = () => ({ type: LOGOUT_BEGIN });

export const logoutError = () => ({
  type: LOGOUT_ERROR
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export function logout(token) {
  return dispatch => {
    dispatch(logoutBegin());
    return token
      ? fetch(`${apiEndpoint}/logout/?token=${token}`)
          .then(raw => handleErrors(raw))
          .then(response => response.json())
          .then(json => {
            dispatch(deleteInvalidToken());
            dispatch(logoutSuccess());
            dispatch(invalidateSession());
            dispatch(logoutCall());
          })

          .catch(error => {
            dispatch(logoutError(error));
            dispatch(deleteInvalidToken());
            dispatch(invalidateSession());
            dispatch(logoutCall());
          })
      : dispatch(invalidateSession()) && dispatch(logoutCall());
  };
}
