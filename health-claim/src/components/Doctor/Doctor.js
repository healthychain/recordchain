import React, { Component } from "react";
import "./Doctor.scss";
import EventPanel from "../EventPanel/EventPanel";

import IssueBox from "./IssueBox.js";

class Doctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      data: []
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.sessionID !== this.props.sessionID) {
      this.props.fetchNotifications(newProps.sessionID);
    }
  }

  componentDidMount() {
    const { sessionID } = this.props;
    this.props.fetchNotifications(sessionID);
  }

  render() {
    // console.log(JSON.stringify(this.state.data));
    // console.log(this.state.data);
    return (
      <div className="doctor-layout">
        <div className="doctor-main">
          <div className="doctor-inner-alt">
            <div className="Box">
              <IssueBox callback={this.props.storeRecord} />
              <button
                onClick={() =>
                  this.props.fetchNotifications(this.props.sessionID)
                }
                className="Button Button__Green"
              >
                Refresh
              </button>
            </div>
            <br />
          </div>
        </div>
        <EventPanel
          loading={this.props.notificationsLoading}
          error={this.props.notificationsError}
          events={this.props.notifications}
        />
      </div>
    );
  }
}

export default Doctor;
