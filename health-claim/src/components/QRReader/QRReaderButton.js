import React from "react";
import QRReader from "./QRReader";
import { Button } from "react-bootstrap";

export default class QRReaderButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      render: "",
      qrRendered: false,
      buttonText: "Scan doctor's QR Code"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(compName, e) {
    console.log(compName);
    if (compName == "QRReader" && this.state.qrRendered) {
      this.setState({ render: "NoQRReader" });
      this.setState({ qrRendered: false });
      this.setState({ buttonText: "Scan doctor's QR Code" });
      console.log("Stopping");
    } else {
      this.setState({ render: compName });
      this.setState({ qrRendered: true });
      this.setState({ buttonText: "Hide" });
      console.log("Starting");
    }
  }

  _renderSubComp() {
    switch (this.state.render) {
      case "QRReader":
        return <QRReader />;
      case "NOQRReader":
        return <></>;
    }
  }

  render() {
    return (
      <div>
        <Button
          bsStyle="primary"
          block
          value="QR"
          onClick={this.handleClick.bind(this, "QRReader")}
        >
          {this.state.buttonText}
        </Button>
        {this._renderSubComp()}
      </div>
    );
  }
}
