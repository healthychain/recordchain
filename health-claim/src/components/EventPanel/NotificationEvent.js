import React, { Component } from "react";
import "./EventPanel.scss";

class NotificationEvent extends Component {
  render() {
    console.log(this.props);
    const {
      handle,
      acceptAction,
      dismissAction,
      events,
      token,
      id
    } = this.props;
    return (
      <div className={"Event"}>
        <div className="EventBody">
          <p>{acceptAction}</p>
        </div>
        <div className="EventActions">
          <div
            className="Action__Accept"
            onClick={() => handle(acceptAction, events, id, token)}
          >
            <i className="fa fa-check" />
          </div>
          <div
            className="Action__Dismiss"
            onClick={() => handle(dismissAction, events, id, token)}
          >
            <i className="fa fa-times" />
          </div>
        </div>
      </div>
    );
  }
}
// needs container -> maps dispatch to props
// index is props.idx
// remove itself from state
// dispatch -> fetch with url from props

export default NotificationEvent;
