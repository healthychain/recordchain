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
      shown: false
    };
  }

  handleSubmit() {
    //this.props.fetchCreds(sessionID);
    this.setState({shown: true});
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
        <button onClick={this.handleSubmit.bind(this)} className="Button Button__Green">
          Submit
        </button>
        {this.state.shown && <ModalExample> </ModalExample>}
      </div>
    );
  }
}

export default IssueTab;
