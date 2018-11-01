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
    return fetch(`http://localhost:8000/get_events/${sessionID}`)
      .then(raw => handleErrors(raw))
      .then(response => response.json())
      .then(json => {
        dispatch(fetchNotificationsSuccess(json.notifications));
        return json.notifications;
      })
      .catch(error => fetchNotificationsError(error));
  };
}

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export default fetchNotifications;
