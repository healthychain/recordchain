import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";
import login from "../actions/login";

const mapStateToProps = (state, props) => (
  console.log(state),
  {
    ...props,
    loginSuccess: state.login.success,
    loading: state.login.loading,
    error: state.login.error
  }
);

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  login: (username, password) => dispatch(login(username, password))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginForm)
);
