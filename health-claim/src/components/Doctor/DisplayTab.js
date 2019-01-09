import React, { Component } from "react";
import "./Doctor.scss";
import EventPanel from "../EventPanel/EventPanel";
import "../Login/LoginForm.scss";
import { apiEndpoint } from "../../apiEndpoint";
import ModalExample from "../Doctor/Record";

class IssueTab extends React.Component<> {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      data: {},
      username: null,
      patientsPractice: window.location.origin.slice(0, -4)
    };
  }

  handleSearch() {
    const { sessionID } = this.props;
    this.props.fetchCachedCreds(
      sessionID,
      this.state.username,
      this.state.patientsPractice
    );
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

  componentWillReceiveProps(newProps) {
    if (newProps.sessionID !== this.props.sessionID) {
      this.props.fetchNotifications(newProps.sessionID);
    }
    if (newProps.cachedCreds !== this.props.cachedCreds) {
      const { cachedCreds } = newProps;
      this.setState({
        data: {
          ...this.state.data,
          ...cachedCreds
        }
      });
    }
  }

  componentDidMount() {
    const { sessionID } = this.props;
    this.props.fetchCredDef();
    this.props.fetchNotifications(sessionID);
  }

  render() {
    console.log(this.state);
    const { cachedCreds, credDef } = this.props;
    return (
      <div>
        <h3>Edit health record</h3>
        <div className="separator" />
        <label className="Input__Label">Patient's username</label>
        <input
          onChange={e => this.setState({ username: e.target.value })}
          className="Input__Text"
          type="text"
          value={this.state.username}
        />
        <label className="Input__Label" style={{ marginTop: "10px" }}>
          The URL of the patient's practice
        </label>
        <input
          onChange={e => this.setState({ patientsPractice: e.target.value })}
          className="Input__Text"
          type="text"
          value={this.state.patientsPractice}
        />
        <button
          onClick={this.handleSearch.bind(this)}
          className="Button Button__Green"
          style={{ marginTop: "20px" }}
        >
          Search
        </button>

        <div className="separator" />

        {!this.props.cachedCreds || this.props.cachedCreds.length === 0 ? (
          <p>No health record data was found </p>
        ) : (
          <div className="Form__Rack">
            {credDef.map((credential, idx) => (
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
            ))}
            <div className="separator" />
            <button
              onClick={this.handleSubmit}
              className="Button Button__Green"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default IssueTab;
