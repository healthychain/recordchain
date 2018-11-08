import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import "../Doctor/Doctor.scss";
import "../Login/LoginForm.scss";
import "../UI/Containers";
import "../Core/App.scss";
import EventPanel from "../EventPanel/EventPanel";
import { apiEndpoint } from "../../apiEndpoint";

class Patient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };
  }

  componentDidMount() {
    const { sessionID } = this.props;
    this.props.fetchNotifications(sessionID);
  }

  render() {
    return (
      <div className="doctor-layout">
        <div className="doctor-main">
          <div className="doctor-inner-alt">
            <div className="Box">
              <label className="Input__Label">Input</label>
              <textarea
                disabled
                onChange={e => this.setState({ input: e.target.value })}
                className="Input__Area"
                type="text"
                value={this.state.input}
              />
              <hr />
              <button
                onClick={() =>
                  fetch(
                    `${apiEndpoint}/get_credentials?token=${
                      this.props.sessionID
                    }`
                  )
                    .then(response => response.json())
                    .then(json => {
                      console.log(json);
                      this.setState({
                        input: JSON.stringify(json.credentials)
                      });
                    })
                }
                className="Button Button__Green"
              >
                Fetch credentials
              </button>{" "}
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
