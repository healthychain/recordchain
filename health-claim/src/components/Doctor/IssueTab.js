import React, { Component } from "react";
import "./Doctor.scss";
import EventPanel from "../EventPanel/EventPanel";
import "../Login/LoginForm.scss";
import { apiEndpoint } from "../../apiEndpoint";

class IssueTab extends React.Component<> {
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
    console.log(this.state);
    return (
      <div>
        <h3>Create new health record</h3>
        <div className="separator" />
        <label className="Input__Label">Patient's username</label>
        <input
          onChange={e => this.setState({ username: e.target.value })}
          className="Input__Text"
          type="text"
          value={this.state.username}
        />
        <div className="separator" />
        <div className="Form__Rack">
          {credDef.length === 0 ? (
            <button
              onClick={() => this.props.fetchCredDef()}
              className="Button Button__Green"
            >
              Refresh
            </button>
          ) : (
            credDef.map((credential, idx) => (
              <div className="HealthRecord__cell" key={credential}>
                <div className="Flex__Column">
                  <div className="HealthRecord__key">
                    <label
                      className="HealthRecord__key__text"
                      htmlFor={credential}
                    >
                      {credential[0].toUpperCase() + credential.substring(1)}
                    </label>
                  </div>
                  <div className="HealthRecord__key_sep" />
                </div>
                <dic
                  className="Flex__Column"
                  style={{ width: "100%", height: "39px" }}
                >
                  <div className="HealthRecord__value">
                    <input
                      onChange={e => {
                        this.setState({
                          data: {
                            ...this.state.data,
                            [e.target.name]: e.target.value
                          }
                        });
                      }}
                      className="HealthRecord__Input"
                      value={this.state.data[credential]}
                      key={credential}
                      type="text"
                      name={credential}
                    />
                    {idx + 1 !== credDef.length && (
                      <div className="HealthRecord__value_sep" />
                    )}
                  </div>
                </dic>
              </div>
            ))
          )}
          <div className="separator" />
          <button onClick={this.handleSubmit} className="Button Button__Green">
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default IssueTab;
