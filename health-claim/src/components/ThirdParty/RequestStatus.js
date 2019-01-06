import * as React from "react";
import classNames from "classnames";
import { Link, withRouter } from "react-router-dom";

import "./AttributeRequest.scss";

class RequestStatus extends React.Component {
  componentDidMount() {
    const { fetchReqStatus } = this.props;
    fetchReqStatus("third-party");
  }

  render() {
    const { reqStatusLoading, proof, reqStatus } = this.props;

    console.log(reqStatus, reqStatusLoading);

    return reqStatusLoading ? (
      <p>Loading</p>
    ) : Object.keys(reqStatus).length === 0 ? (
      <p>
        You have no pending requests. In order to request data from a user
        please navigate to the Request tab
      </p>
    ) : (
      [
        <div className={"RequestStatus__wrapper"}>
          <div className="RequestStatus__key Flex__DarkBlue">
            <p style={{ fontWeight: "500", margin: "0" }}>{"Username"} </p>
          </div>
          <div className="RequestStatus__value Flex__Blue">{"Message"}</div>
          {<div className="RequestStatus__viewButton Flex__Blue">Action</div>}
        </div>,
        Object.keys(reqStatus).map(did => (
          <div className={"RequestStatus__wrapper"}>
            <div className="RequestStatus__key Flex__Blue">
              <p style={{ fontWeight: "500", margin: "0" }}>{did} </p>
            </div>
            <div className="RequestStatus__value">
              {reqStatus[did]
                ? "Your request has been accepted by the user"
                : "Still waiting for the approval from the user"}
            </div>
            {reqStatus[did] ? (
              <Link to={`/thirdparty/view/${did}`}>
                <div className="RequestStatus__viewButton RequestStatus__viewButton_green">
                  View
                </div>
              </Link>
            ) : (
              <div className="RequestStatus__viewButton RequestStatus__viewButton_red">
                Waiting
              </div>
            )}
          </div>
        ))
      ]
    );
  }
}

export default withRouter(RequestStatus);
