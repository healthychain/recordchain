import React, { Component } from "react";
import "./Doctor.scss";
import EventPanel from "../EventPanel/EventPanel";
import "../Login/LoginForm.scss";
import { apiEndpoint } from "../../apiEndpoint";
import IsssueTab from "./IssueTab";
import DisplayTab from "./DisplayTab";

const TABS = ["Patient Health Record"];

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
    this.props.fetchNotifications(this.props.sessionID);
  }

  render() {
    const { tabIndex } = this.state;
    return (
      <div className="dashboard-layout">
        <div className="Flex__Column">
          <div
            className="Flex__Blue Flex__Centered Flex__Double"
            style={{ padding: "5px 38px" }}
          >
            <h1 className="Page__Title">{`Dashboard`}</h1>
          </div>
          <div className="dashboard-main">
            <div className="dashboard-inner-alt">
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
                  {/* {tabIndex === 0 && <IsssueTab {...this.props} />} */}
                  {tabIndex === 0 && <DisplayTab {...this.props} />}
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Doctor;
