import React from "react";
import QRReader from "./QRReader";
import { Button } from "react-bootstrap";

export default class QRReaderButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      qrRendered: false,
      buttonText: "Scan doctor's QR Code"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (this.state.qrRendered) {
      this.setState({ qrRendered: false });
      this.setState({ buttonText: "Scan doctor's QR Code" });
      console.log("Stopping");
    } else {
      this.setState({ qrRendered: true });
      this.setState({ buttonText: "Hide" });
      console.log("Starting");
    }
  }

  _renderSubComp() {
    if (this.state.qrRendered) {
      return <QRReader />;
    }
    return <></>;
  }

  render() {
    return (
      <div>
        <Button
          bsStyle="primary"
          block
          value="QR"
          onClick={this.handleClick.bind(this)}
        >
          {this.state.buttonText}
        </Button>
        {this._renderSubComp()}
      </div>
    );
  }
}
