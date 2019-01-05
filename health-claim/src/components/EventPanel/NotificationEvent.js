import React, { Component } from "react";
import "./EventPanel.scss";

class NotificationEvent extends Component {
  constructor(props) {
    super(props);

    this.state = { masterSecret: null };
  }

  render() {
    const {
      handle,
      acceptAction,
      dismissAction,
      events,
      token,
      id,
      type,
      fromDid,
      createdAt,
      requireMasterSecret
    } = this.props;
    const { masterSecret } = this.state;
    return (
      <div className={"Event"}>
        <div className="EventBody">
          <div className="Event__Header">
            <p style={{ fontWeight: "600" }}>{type}</p>
            <p>{createdAt}</p>
          </div>
          <div
            className="Event__Header"
            style={{ justifyContent: "flex-start" }}
          >
            <p style={{ fontWeight: "600" }}>{`user DID:`}</p>
            <p style={{ marginLeft: "10px" }}>{fromDid}</p>
          </div>
          {requireMasterSecret ? (
            <div>
              <input
                className="Input__Text"
                type="text"
                value={this.state.masterSecret}
                onChange={e => this.setState({ masterSecret: e.target.value })}
                placeholder="Master Secret"
              />{" "}
              <hr />
            </div>
          ) : null}
        </div>
        <div className="EventActions">
          <div
            className={
              this.props.requireMasterSecret && !this.state.masterSecret
                ? "Action__Accept__Disabled"
                : "Action__Accept"
            }
            onClick={() =>
              this.props.requireMasterSecret && !this.state.masterSecret
                ? null
                : handle(acceptAction, events, id, token, masterSecret)
            }
          >
            <i className="fa fa-check" />
          </div>
          <div
            className="Action__Dismiss"
            onClick={() =>
              handle(dismissAction, events, id, token, masterSecret)
            }
          >
            <i className="fa fa-times" />
          </div>
        </div>
      </div>
    );
  }
}

export default NotificationEvent;
