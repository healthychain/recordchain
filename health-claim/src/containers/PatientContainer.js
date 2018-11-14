// Patient container

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import fetchNotifications from "../actions/fetchNotifications";
import Patient from "../components/Patient/Patient";
import fetchCreds from "../actions/fetchCredentials";

const mapStateToProps = (state, props) => ({
  ...props,
  loggedIn: state.verifySession.success,
  sessionID: state.sessionToken.token,
  notificationsLoading: state.fetchNotifications.loading,
  notificationsError: state.fetchNotifications.error,
  notifications: state.fetchNotifications.notifications,
  credentials: state.fetchCreds.credentials
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  fetchCreds: sessionID => dispatch(fetchCreds(sessionID)),
  fetchNotifications: sessionID => dispatch(fetchNotifications(sessionID))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Patient)
);
