import React, { Component } from "react";

import "../Doctor/Doctor.scss";
import "../Login/LoginForm.scss";
import "../UI/Containers";
import "../Core/App.scss";
import EventPanel from "../EventPanel/EventPanel";

class Patient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };
  }

  componentDidMount() {
    const { sessionID } = this.props;
    this.props.fetchCreds(sessionID);
    this.props.fetchNotifications(sessionID);
  }

  render() {
    const { credentials } = this.props.credentials;
    console.log(this.props.credentials);
    return (
      <div className="dashboard-layout">
        <div className="Flex__Column">
          <div
            className="Flex__Blue Flex__Centered Flex__Double"
            style={{ padding: "5px 38px" }}
          >
            <h1 className="Page__Title">{`Dashboard`}</h1>
          </div>
          <div className="dashboard-main">
            <div className="dashboard-inner-alt">
              <div className="Box">
                <h3>Your personal health record</h3>
                <div className="separator" />
                {!credentials || Object.keys(credentials).length === 0 ? (
                  <>
                    <h3>No health record issued yet</h3>{" "}
                  </>
                ) : (
                  <>
                    {Object.keys(credentials).map((key, idx) => (
                      <div className="HealthRecord__cell" key={key}>
                        <div className="Flex__Column">
                          <div className="HealthRecord__key">
                            <label className="HealthRecord__key__text">
                              {key[0].toUpperCase() + key.substring(1)}
                            </label>
                          </div>
                          <div className="HealthRecord__key_sep" />
                        </div>
                        <dic
                          className="Flex__Column"
                          style={{ width: "100%", height: "39px" }}
                        >
                          <div className="HealthRecord__value">
                            <div className="HealthRecord__Input">
                              <p style={{ padding: "0", margin: "0" }}>
                                {credentials[key]}
                              </p>
                            </div>
                            {idx + 1 !== Object.keys(credentials).length && (
                              <div className="HealthRecord__value_sep" />
                            )}
                          </div>
                        </dic>
                      </div>
                    ))}
                  </>
                )}

                <hr />

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
        </div>
      </div>
    );
  }
}

export default Patient;
