import { connect } from "react-redux";
import { withRouter } from "react-router";
import RequestBuilder from "../components/ThirdParty/RequestBuilder";
import { tpRequest } from "../actions/thirdPartyCalls";
import { fetchCredDefTypes } from "../actions/fetchCredDef";

const mapStateToProps = (state, props) => ({
  ...props,
  credDefTypes: state.fetchCredDef.attrs_types
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  fetchCredDefTypes: () => dispatch(fetchCredDefTypes()),
  tpRequest: (userDID, domain, req_attr, req_pred) =>
    dispatch(tpRequest(userDID, domain, req_attr, req_pred))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RequestBuilder)
);
