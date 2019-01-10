import { connect } from "react-redux";
import { withRouter } from "react-router";
import RequestBuilder from "../components/ThirdParty/RequestBuilder";
import { tpRequest } from "../actions/thirdPartyCalls";
import fetchCredDef from "../actions/fetchCredDef";
import setPredicates from "../actions/setPredicates";

const mapStateToProps = (state, props) => ({
  ...props,
  credDef: state.fetchCredDef.attrs
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  fetchCredDef: () => dispatch(fetchCredDef()),
  tpRequest: (userDID, domain, req_attr, req_pred) =>
    dispatch(tpRequest(userDID, domain, req_attr, req_pred)),
  setPredicates: pred => dispatch(setPredicates(pred))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RequestBuilder)
);
