import Routes from "./Routes";
import { connect } from "react-redux";

const mapStateToProps = (state, props) => ({
  ...props,
  loggedIn: state.verifySession.success,
  accountType: state.sessionToken.accountType,
  validating: state.verifySession.loading
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
