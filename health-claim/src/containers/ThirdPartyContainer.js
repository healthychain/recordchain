import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ThirdParty from "../components/ThirdParty/ThirdParty";
import { tpView } from "../actions/thirdPartyCalls";
import fetchReqStatus from "../actions/fetchCredReqStatus";

const mapStateToProps = (state, props) => ({
  ...props,
  proof: state.thirdPartyCalls.proof,
  reqStatusLoading: state.fetchCredReqStatus.loading,
  reqStatus: state.fetchCredReqStatus.requests
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  tpView: userDID => dispatch(tpView(userDID)),
  fetchReqStatus: myDID => dispatch(fetchReqStatus(myDID))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ThirdParty)
);
