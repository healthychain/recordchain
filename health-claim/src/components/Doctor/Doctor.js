import React, { Component } from "react";
import "./Doctor.scss";
import EventPanel from "../EventPanel/EventPanel";
import "../Login/LoginForm.scss";
import { apiEndpoint } from "../../apiEndpoint";

import IssueBox from "./IssueBox.js";

class Doctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      data: {}
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.sessionID !== this.props.sessionID) {
      this.props.fetchNotifications(newProps.sessionID);
    }
  }

  componentDidMount() {
    const { sessionID } = this.props;
    this.props.fetchCredDef();
    this.props.fetchNotifications(sessionID);
  }

  handleSubmit = event => {
    fetch(
      `${apiEndpoint}/credential_offer?token=${
        this.props.sessionID
      }&prover_username=${this.state.username}`,
      {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(this.state.data)
      }
    );
  };

  render() {
    const { credDef } = this.props;

    return (
      <div className="doctor-layout">
        <div className="doctor-main">
          <div className="doctor-inner-alt">
            <p>{`Your did: ${this.props.did}`}</p>
            <div className="Box">
              <label className="Input__Label">Patient's username</label>
              <input
                onChange={e => this.setState({ username: e.target.value })}
                className="Input__Text"
                type="text"
                value={this.state.username}
              />
              <h3>Issue a new record</h3>

              <br />
              <div className="Form__Rack">
                {credDef.length === 0 ? (
                  <button
                    onClick={() => this.props.fetchCredDef()}
                    className="Button Button__Green"
                  >
                    Refresh
                  </button>
                ) : (
                  credDef.map(credential => (
                    <div className="Form__Cell" key={credential}>
                      <label className="Input__Label" htmlFor={credential}>
                        {credential[0].toUpperCase() + credential.substring(1)}
                      </label>
                      <input
                        onChange={e => {
                          this.setState({
                            data: {
                              ...this.state.data,
                              [e.target.name]: e.target.value
                            }
                          });
                        }}
                        className="Input__Text"
                        value={this.state[credential]}
                        key={credential}
                        type="text"
                        name={credential}
                      />
                    </div>
                  ))
                )}
                <button
                  onClick={this.handleSubmit}
                  className="Button Button__Green"
                >
                  Submit
                </button>
              </div>
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
