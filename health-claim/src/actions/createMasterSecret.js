import { apiEndpoint } from "../apiEndpoint";
import handleErrors from "./handleErrors";
import logout from "./login";

export const CREATE_MASTER_SECRET_BEGIN = "CREATE_MASTER_SECRET_BEGIN";
export const CREATE_MASTER_SECRET_SUCCESS = "CREATE_MASTER_SECRET_SUCCESS";
export const CREATE_MASTER_SECRET_ERROR = "CREATE_MASTER_SECRET_ERROR";

export const createMasterSecretBegin = () => ({
  type: CREATE_MASTER_SECRET_BEGIN
});

export const createMasterSecretError = () => ({
  type: CREATE_MASTER_SECRET_ERROR
});

export const createMasterSecretSuccess = () => ({
  type: CREATE_MASTER_SECRET_SUCCESS
});

function createMasterSecret(sessionID, masterSecret) {
  return dispatch => {
    dispatch(createMasterSecretBegin());
    return fetch(
      `${apiEndpoint}/create_master_secret?token=${sessionID}&master_secret=${masterSecret}`
    )
      .then(res => checkSessionValidity(res, dispatch))
      .then(raw => handleErrors(raw))
      .then(json => {
        dispatch(createMasterSecretSuccess());
      })
      .catch(error => createMasterSecretError(error));
  };
}

const checkSessionValidity = (responseJson, dispatch) => {
  if (responseJson.status === 401) {
    dispatch(logout());
  }
  return responseJson;
};

export default createMasterSecret;
