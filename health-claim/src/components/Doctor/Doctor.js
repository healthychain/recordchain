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
      data: [],
      credDef: ["name", "sex", "age"]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    const { credDef } = this.props;
    const data = {};
    credDef.map(cred => (data[cred] = this.state[cred]));

    this.props.storeRecord(data);

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
        body: JSON.stringify(data)
      }
    );
  }

  render() {
    // Uncomment this when backend call for cred def is ready
    // const { credDef } = this.props;
    const credDef = ["name", "sex", "age"];

    return (
      <div className="doctor-layout">
        <div className="doctor-main">
          <div className="doctor-inner-alt">
            <div className="Box">
              <h3>Issue a new record</h3>
              <hr />
              {/* <IssueBox
                sessionID={this.props.sessionID}
                callback={this.props.storeRecord}
              /> */}
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
                        onChange={e =>
                          this.setState({ [e.target.name]: e.target.value })
                        }
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
