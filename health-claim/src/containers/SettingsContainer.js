import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Settings from "../components/Settings/Settings";
import createMasterSecret from "../actions/createMasterSecret";
import fetchNotifications from "../actions/fetchNotifications";

const mapStateToProps = (state, props) => ({
  ...props,
  token: state.sessionToken.token,
  did: state.sessionToken.did,
  sessionID: state.sessionToken.token
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  createMasterSecret: (token, masterSecret) =>
    dispatch(createMasterSecret(token, masterSecret)),
  fetchNotifications: sessionID => dispatch(fetchNotifications(sessionID))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...ownProps,
  createMasterSecret: masterSecret =>
    dispatchProps.createMasterSecret(stateProps.token, masterSecret),
  fetchNotifications: dispatchProps.fetchNotifications
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(Settings)
);
