import { apiEndpoint } from "../apiEndpoint";

export const HANDLE_NOTIFICATION = "HANDLE_NOTIFICATION";

export const handleNotification = notifications => ({
  type: HANDLE_NOTIFICATION,
  payload: { notifications }
});

function handle(url, allNotifications, notificationID, token) {
  return dispatch => {
    return fetch(`${apiEndpoint}/${url}token=${token}`).then(
      dispatch(
        handleNotification(
          allNotifications.filter(elem => elem.id !== notificationID)
        )
      )
    );
  };
}

export default handle;
