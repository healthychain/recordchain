import React, { Component } from "react";
import "../Doctor/Doctor.scss";
import "../Login/LoginForm.scss";
import RequestBuilderContainer from "../../containers/RequestBuilderContainer";
import RequestStatus from "./RequestStatus";

const TABS = ["Request", "Request Status"];

class ThirdParty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0
    };
  }

  componentDidMount() {
    const { fetchReqStatus } = this.props;
    fetchReqStatus("third-party");
  }

  callback = data => {
    this.setState({ predicates: data });
  };

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
                      <RequestBuilderContainer callback={this.callback} />
                    </div>
                  </>
                )}
                {tabIndex === 1 && (
                  <div className="Form__Cell">
                    <RequestStatus {...this.props} />
                  </div>
                )}
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default ThirdParty;
