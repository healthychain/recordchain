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
      data: {},
      username: null
    };
  }

  handleSubmit = event => {
    //this.props.fetchCreds(sessionID);
  };

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
    return (
      <div>
        <h3>View a health record</h3>
        <div className="separator" />
        <label className="Input__Label">Patient's username</label>
        <input
          onChange={e => this.setState({ username: e.target.value })}
          className="Input__Text"
          type="text"
          value={this.state.username}
        />
        <div className="separator" />
        <button onClick={this.handleSubmit} className="Button Button__Green">
          Submit
        </button>
      </div>
    );
  }
}

export default IssueTab;
