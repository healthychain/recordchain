import { apiEndpoint } from "../apiEndpoint";

export const HANDLE_NOTIFICATION = "HANDLE_NOTIFICATION";

export const handleNotification = notifications => ({
  type: HANDLE_NOTIFICATION,
  payload: { notifications }
});

function handle(url, allNotifications, notificationID, token, masterSecret) {
  return dispatch => {
    debugger;
    return masterSecret
      ? fetch(
          `${apiEndpoint}/${url}token=${token}&master_secret=${masterSecret}`
        ).then(
          dispatch(
            handleNotification(
              allNotifications.filter(elem => elem.id !== notificationID)
            )
          )
        )
      : fetch(`${apiEndpoint}/${url}token=${token}`).then(
          dispatch(
            handleNotification(
              allNotifications.filter(elem => elem.id !== notificationID)
            )
          )
        );
  };
}

export default handle;
