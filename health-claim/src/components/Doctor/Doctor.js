import React, { Component } from "react";
import "./Doctor.scss";
import EventPanel from "../EventPanel/EventPanel";
import IssueBox from "./IssueBox.js";

class Doctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      data: []
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.sessionID !== this.props.sessionID) {
      this.props.fetchNotifications(newProps.sessionID);
    }
  }

  render() {
    return (
      <div className="doctor-layout">
        <div className="doctor-main">
          <div className="doctor-inner-alt">
            <div className="Box">
              <IssueBox callback={this.props.storeRecord} />
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

    // return (
    //   <div className="doctor-layout">
    //     <div className="doctor-main">
    //       <div className="doctor-inner-alt">
    //         <div className="Box">
    //           <label className="Input__Label">Your username</label>
    //           <input
    //             onChange={e => this.setState({ username: e.target.value })}
    //             className="Input__Text"
    //             type="text"
    //             value={this.state.username}
    //           />
    //           <br /> <label className="Input__Label">Input</label>
    //           <textarea
    //             onChange={e => this.setState({ input: e.target.value })}
    //             className="Input__Area"
    //             type="text"
    //             value={this.state.input}
    //           />
    //           <hr />
    //           <button
    //             onClick={() =>
    //               fetch(
    //                 `${apiEndpoint}/credential_offer?token=${
    //                   this.props.sessionID
    //                 }&prover_username=${this.state.username}
    //                 &data=${JSON.stringify(this.state.input)}`
    //               )
    //             }
    //             className="Button Button__Green"
    //           >
    //             Issue credentials
    //           </button>
    //           <button
    //             onClick={() =>
    //               this.props.fetchNotifications(this.props.sessionID)
    //             }
    //             className="Button Button__Green"
    //           >
    //             Refresh
    //           </button>
    //         </div>
    //         <br />
    //       </div>
    //     </div>
    //     <EventPanel
    //       loading={this.props.notificationsLoading}
    //       error={this.props.notificationsError}
    //       events={this.props.notifications}
    //     />
    //   </div>
    // );
  }
}

export default Doctor;
