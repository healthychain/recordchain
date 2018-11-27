import { connect } from "react-redux";
import { withRouter } from "react-router";
import RequestBuilder from "../components/ThirdParty/RequestBuilder";
import { tpRequest } from "../actions/thirdPartyCalls";

const mapStateToProps = (state, props) => ({
  ...props
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  tpRequest: (userDID, domain, req_attr, req_pred) =>
    dispatch(tpRequest(userDID, domain, req_attr, req_pred))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RequestBuilder)
);
