import Routes from "./Routes";
import { connect } from "react-redux";

const mapStateToProps = (state, props) => ({
  ...props
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
