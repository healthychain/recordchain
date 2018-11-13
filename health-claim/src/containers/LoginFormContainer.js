import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";
import login from "../actions/login";

const mapStateToProps = (state, props) => ({
  ...props,
  loginSuccess: state.verifySession.success,
  loading: state.login.loading,
  error: state.login.error
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  login: (username, password, account_type) =>
    dispatch(login(username, password, account_type))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginForm)
);
