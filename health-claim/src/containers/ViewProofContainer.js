import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ViewProof from "../components/ThirdParty/ViewProof";
import { tpView } from "../actions/thirdPartyCalls";
import fetchReqStatus from "../actions/fetchCredReqStatus";

const mapStateToProps = (state, props) => ({
  ...props,
  proof: state.thirdPartyCalls.proof,
  predicates: state.setPredicates.predicates
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  tpView: userDID => dispatch(tpView(userDID))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ViewProof)
);
