//@flow

import * as React from "react";
import "./Settings.scss";
import QRCode from "qrcode.react";

type Props = {
  createMasterSecret: Fucntion
};

type State = {
  masterSecret: String,
  did: String
};

class Settings extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      masterSecret: ""
    };
  }

  handleUpdateMasterSecret = event => {
    this.setState({ masterSecret: event.target.value });
  };

  render() {
    const { createMasterSecret, did } = this.props;
    return (
      <div className="Settings__container">
        <div className="Flex__Column">
          <div
            className="Flex__Blue Flex__Centered Flex__Double"
            style={{ padding: "5px 38px" }}
          >
            <h1 className="Page__Title">{`Settings`}</h1>
          </div>
          <div className="Settings__inner_container">
            <div className="Settings__row">
              <div className="Settings__row__name">Your DID</div>
              <QRCode value={did} />

              <div className="Settings__input__container">{did}</div>
            </div>

            <div className="Settings__row">
              <div className="Settings__row__name">Master secret</div>
              <div className="Settings__input__container">
                <input
                  value={this.state.masterSecret}
                  onChange={this.handleUpdateMasterSecret}
                />
              </div>
            </div>
            <div className="Settings__row">
              <div
                className="Button Button__Green"
                onClick={() => createMasterSecret(this.state.masterSecret)}
              >
                Submit
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
