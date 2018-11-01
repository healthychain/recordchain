import { apiEndpoint } from "../apiEndpoint";

export const HANDLE_NOTIFICATION = "HANDLE_NOTIFICATION";

export const handleNotification = notifications => ({
  type: HANDLE_NOTIFICATION,
  payload: { notifications }
});

function handle(url, index, allNotifications) {
  return dispatch => {
    dispatch(handleNotification(allNotifications.splice(index, 1)));
    return fetch(`${apiEndpoint}/${url}`);
  };
}

export default handle;
