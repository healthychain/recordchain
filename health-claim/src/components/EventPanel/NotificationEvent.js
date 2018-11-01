import React, { Component } from "react";
import "./EventPanel.scss";

class NotificationEvent extends Component {
  render() {
    const { payload, handle, acceptURL, idx, events } = this.props;
    return (
      <div className={"Event"}>
        <p>Username = {payload.username}</p>
        <p onClick={() => handle(acceptURL, idx, events)}>Accept</p>
        {/* <p onClick={() => handle(rejectURL, idx, events)}>Reject</p> */}
      </div>
    );
  }
}
// needs container -> maps dispatch to props
// index is props.idx
// remove itself from state
// dispatch -> fetch with url from props

export default NotificationEvent;
