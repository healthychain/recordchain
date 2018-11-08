import { apiEndpoint } from "../apiEndpoint";
import logout from "./login";
import handleErrors from "./handleErrors";

export const FETCH_NOTIFICATIONS_BEGIN = "FETCH_NOTIFICATIONS_BEGIN";
export const FETCH_NOTIFICATIONS_SUCCESS = "FETCH_NOTIFICATIONS_SUCCESS";
export const FETCH_NOTIFICATIONS_ERROR = "FETCH_NOTIFICATIONS_ERROR";

export const fetchNotificationsBegin = () => ({
  type: FETCH_NOTIFICATIONS_BEGIN
});

export const fetchNotificationsError = error => ({
  type: FETCH_NOTIFICATIONS_ERROR,
  payload: { error }
});

export const fetchNotificationsSuccess = notifications => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  payload: { notifications }
});

function fetchNotifications(sessionID) {
  return dispatch => {
    dispatch(fetchNotificationsBegin());
    return fetch(`${apiEndpoint}/get_events/?token=${sessionID}`)
      .then(res => checkSessionValidity(res, dispatch))
      .then(raw => handleErrors(raw))
      .then(response => response.json(), console.log(sessionID))
      .then(json => {
        dispatch(fetchNotificationsSuccess(JSON.parse(json.events)));
        return json.notifications;
      })
      .catch(error => fetchNotificationsError(error));
  };
}

const checkSessionValidity = (responseJson, dispatch) => {
  if (responseJson.status === 401) {
    dispatch(logout());
  }
  return responseJson;
};

export default fetchNotifications;
