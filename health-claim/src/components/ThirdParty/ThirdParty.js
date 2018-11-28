import React, { Component } from "react";
import "../Doctor/Doctor.scss";
import "../Login/LoginForm.scss";
import RequestBuilderContainer from "../../containers/RequestBuilderContainer";

const TABS = ["Request", "View"];

class ThirdParty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0
    };
  }

  render() {
    const { tabIndex } = this.state;
    const { proof } = this.props;
    return (
      <div className="dashboard-layout">
        <div className="dashboard-main">
          <div className="dashboard-inner-alt">
            <div className="Box">
              <div className="Box__Tabs">
                {TABS.map((tab, idx) => (
                  <div
                    onClick={() => this.setState({ tabIndex: idx })}
                    className={`Tab__single ${
                      tabIndex === idx ? "Tab__single__active" : ""
                    }`}
                  >
                    <p
                      className={`Tab__text ${
                        tabIndex === idx ? "Tab__text__active" : ""
                      }`}
                    >
                      {tab}
                    </p>
                  </div>
                ))}
              </div>
              <div className="doctor__content">
                {tabIndex === 0 && (
                  <>
                    <div className="Form__Cell">
                      <RequestBuilderContainer />
                    </div>
                  </>
                )}
                {tabIndex === 1 && (
                  <>
                    <div className="Form__Rack">
                      <div className="Form__Cell">
                        <label className="Input__Label">
                          Request stuff from user (DID)
                        </label>
                        <input
                          onChange={e =>
                            this.setState({ username: e.target.value })
                          }
                          className="Input__Text"
                          type="text"
                          value={this.state.username}
                        />
                        <br />
                        <label className="Input__Label">Domain</label>
                        <input
                          onChange={e =>
                            this.setState({ domain: e.target.value })
                          }
                          className="Input__Text"
                          value={this.state.domain}
                          type="text"
                          name="domain"
                        />
                      </div>
                    </div>{" "}
                    <>
                      {proof
                        ? Object.keys(proof).map(key => (
                            <>
                              <label className="Input__Label">
                                {key[0].toUpperCase() +
                                  key.substring(1) +
                                  ":\t " +
                                  proof[key]}
                              </label>
                            </>
                          ))
                        : null}
                    </>
                    <button
                      onClick={() => this.props.tpView(this.state.username)}
                      className="Button Button__Green"
                    >
                      View
                    </button>
                  </>
                )}
              </div>
              {/* <button
                onClick={() =>
                  this.props.fetchNotifications(this.props.sessionID)
                }
                className="Button Button__Green"
              >
                Refresh
              </button> */}
            </div>
            <br />
          </div>
        </div>
        {/* <EventPanel
          loading={this.props.notificationsLoading}
          error={this.props.notificationsError}
          events={this.props.notifications}
        /> */}
      </div>
    );
  }
}

export default ThirdParty;
