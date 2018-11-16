import React, { Component } from "react";

import "../Doctor/Doctor.scss";
import "../Login/LoginForm.scss";
import "../UI/Containers";
import "../Core/App.scss";
import EventPanel from "../EventPanel/EventPanel";

class Patient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };
  }

  componentDidMount() {
    const { sessionID } = this.props;
    this.props.fetchCreds(sessionID);
    this.props.fetchNotifications(sessionID);
  }

  render() {
    const { credentials } = this.props.credentials;
    console.log(this.props.credentials);
    return (
      <div className="dashboard-layout">
        <div className="dashboard-main">
          <div className="dashboard-inner-alt">
            <div className="Box">
              {!credentials || Object.keys(credentials).length === 0 ? (
                <>
                  <h3>No health record issued yet</h3>{" "}
                </>
              ) : (
                <>
                  {Object.keys(credentials).map(key => (
                    <>
                      <label className="Input__Label">
                        {key[0].toUpperCase() +
                          key.substring(1) +
                          ":\t " +
                          credentials[key]}
                      </label>
                    </>
                  ))}
                </>
              )}

              <hr />

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

export default Patient;
