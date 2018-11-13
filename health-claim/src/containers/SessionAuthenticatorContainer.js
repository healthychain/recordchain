import { connect } from "react-redux";
import SessionAuthenticator from "../components/Core/SessionAuthenticator";
import { verifySession } from "../actions/verifySession";
import { withRouter } from "react-router";

const mapStateToProps = (state, props) => ({
  ...props,
  token: state.sessionToken.token,
  verifySessionLoading: state.verifySession.loading
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  verifySession: token => dispatch(verifySession(token))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SessionAuthenticator)
);
