// Patient container

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import fetchNotifications from "../actions/fetchNotifications";
import Patient from "../components/Patient/Patient";

const mapStateToProps = (state, props) => ({
  ...props,
  loggedIn: state.login.success,
  sessionID: state.login.token,
  notificationsLoading: state.fetchNotifications.loading,
  notificationsError: state.fetchNotifications.error,
  notifications: state.fetchNotifications.notifications
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  fetchNotifications: sessionID => dispatch(fetchNotifications(sessionID))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Patient)
);
