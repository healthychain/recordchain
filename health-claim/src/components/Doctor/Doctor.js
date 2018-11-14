import React, { Component } from "react";
import "./Doctor.scss";
import EventPanel from "../EventPanel/EventPanel";
import "../Login/LoginForm.scss";
import { apiEndpoint } from "../../apiEndpoint";
import IsssueTab from "./IssueTab";

const TABS = ["Issue", "View"];

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0
    };
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
              </div>
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
