import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import App from "../components/Core/App";
import { logout } from "../actions/logout";

const mapStateToProps = (state, props) => ({
  ...props,
  loggedIn: state.verifySession.success,
  token: state.sessionToken.token,
  notificationsNumber: state.fetchNotifications.notifications.length,
  userType: state.sessionToken.accountType
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  logout: token => dispatch(logout(token))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  logout: () => dispatchProps.logout(stateProps.token)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(App);
