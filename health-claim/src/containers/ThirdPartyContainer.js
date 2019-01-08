import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ThirdParty from "../components/ThirdParty/ThirdParty";
import { tpView } from "../actions/thirdPartyCalls";

const mapStateToProps = (state, props) => ({
  ...props,
  proof: state.thirdPartyCalls.proof
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  tpView: userDID => dispatch(tpView(userDID))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ThirdParty)
);
