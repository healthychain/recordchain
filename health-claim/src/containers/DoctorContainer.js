import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Doctor from "../components/Doctor/Doctor";

const mapStateToProps = (state, props) => ({
  ...props
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Doctor)
);
