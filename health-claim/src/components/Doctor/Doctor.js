import React, { Component } from "react";
import "./Doctor.scss";
import EventPanel from "../EventPanel/EventPanel";
import "../Login/LoginForm.scss";
import { apiEndpoint } from "../../apiEndpoint";
import IsssueTab from "./IssueTab";
import DisplayTab from "./DisplayTab";

const TABS = ["Issue", "View"];

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0
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

  fetchNotifications() {
    console.log(this.props.sessionID)
    this.props.fetchNotifications(this.props.sessionID);
  }

  render() {
    const { tabIndex } = this.state;
    return (
      <div className="doctor-layout">
        <div className="doctor-main">
          <div className="doctor-inner-alt">
            <div className="Box">
              <div className="Box__Tabs">
                {TABS.map((tab, idx) => (
                  <div
                    onClick={() => this.setState({ tabIndex: idx })}
                    className={`Tab__single ${
                      tabIndex === idx ? "Tab__single__active" : ""
                    }`}
                  >
                    <p
                      className={`Tab__text ${
                        tabIndex === idx ? "Tab__text__active" : ""
                      }`}
                    >
                      {tab}
                    </p>
                  </div>
                ))}
              </div>
              <div className="doctor__content">
                {tabIndex === 0 && <IsssueTab {...this.props} />}
                {tabIndex === 1 && <DisplayTab {...this.props} />}
              </div>
            </div>
            <br />
          </div>
        </div>
        <EventPanel
          fetchNotifications={() => this.fetchNotifications()}
          loading={this.props.notificationsLoading}
          error={this.props.notificationsError}
          events={this.props.notifications}
        />
      </div>
    );
  }
}

export default Doctor;
