import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Settings from "../components/Settings/Settings";
import createMasterSecret from "../actions/createMasterSecret";

const mapStateToProps = (state, props) => ({
  ...props,
  token: state.sessionToken.token
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  createMasterSecret: (token, masterSecret) =>
    dispatch(createMasterSecret(token, masterSecret))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...ownProps,
  createMasterSecret: masterSecret =>
    dispatchProps.createMasterSecret(stateProps.token, masterSecret)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(Settings)
);
