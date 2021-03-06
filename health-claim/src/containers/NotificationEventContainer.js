import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NotificationEvent from "../components/EventPanel/NotificationEvent";
import handle from "../actions/handleNotification";
// import fetchPatientInfo from "../actions/fetchPatientInfo";

const mapStateToProps = (state, props) => ({
  ...props,
  token: state.sessionToken.token,
  events: state.fetchNotifications.notifications
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  handle: (url, allNotifications, notificationID, token, masterSecret) =>
    dispatch(handle(url, allNotifications, notificationID, token, masterSecret))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NotificationEvent)
);
