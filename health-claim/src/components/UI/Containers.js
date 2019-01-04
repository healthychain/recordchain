import React, { Component } from "react";
import classNames from "classnames";
import "./Containers.scss";

class Box extends Component {
  render() {
    const { nopad, fullwidth } = this.props;
    return (
      <div
        className={classNames("Box", {
          ["Box__NP"]: nopad,
          ["Box__fullwidth"]: fullwidth
        })}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Box;
