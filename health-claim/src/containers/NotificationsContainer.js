import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Notifications from "../components/EventPanel/Notifications";
import fetchNotifications from "../actions/fetchNotifications";

const mapStateToProps = (state, props) => ({
  ...props,
  loading: state.fetchNotifications.loading,
  error: state.fetchNotifications.error,
  events: state.fetchNotifications.notifications
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  fetchNotifications: sessionID => dispatch(fetchNotifications(sessionID))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Notifications)
);
