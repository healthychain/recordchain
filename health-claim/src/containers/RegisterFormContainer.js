import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import RegisterForm from "../components/Login/RegisterForm";
import register from "../actions/register";

const mapStateToProps = (state, props) => (
  console.log(state),
  {
    ...props,
    loginSuccess: state.register.success,
    loading: state.register.loading,
    error: state.register.error
  }
);

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  register: (username, password) => dispatch(register(username, password))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegisterForm)
);
