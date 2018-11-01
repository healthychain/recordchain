import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NotificationEvent from "../components/EventPanel/NotificationEvent";
import handle from "../actions/handleNotification";
// import fetchPatientInfo from "../actions/fetchPatientInfo";

const mapStateToProps = (state, props) => ({
  ...props,
  events: state.fetchNotifications.notifications
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  handle: (url, index, allNotifications) =>
    dispatch(handle(url, index, allNotifications))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NotificationEvent)
);
