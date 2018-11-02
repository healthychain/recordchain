import React, { Component } from "react";
import "./EventPanel.scss";

class NotificationEvent extends Component {
  render() {
    const { handle, acceptAction, events, token, id } = this.props;
    return (
      <div className={"Event"}>
        <p>{acceptAction}</p>
        <p onClick={() => handle(acceptAction, events, id, token)}>Accept</p>
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
