import React, { Component } from "react";
import PropTypes from "prop-types";
import NotificationEvent from "./NotificationEvent";

import "./EventPanel.scss";

export default class EventPanel extends Component {
  constructor(props) {
    super(props);

    this.state = { collapsed: false };

    this.toggleView = this.toggleView.bind(this);
  }

  shouldComponentUpdate(newProps) {
    return newProps.events !== this.props.events;
  }

  toggleView() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    if (this.props.loading) {
      return <div>Loading</div>;
    } else if (this.props.error) {
      return <div>Error</div>;
    }
    return (
      <div>
        {this.state.collapsed ? (
          <div className="Toggle" onClick={this.toggleView}>
            Notifications
          </div>
        ) : (
          <div className="EventPanel">
            <div className="Toggle__Open" onClick={this.toggleView}>
              Minimize
            </div>
            {this.props.events &&
              this.props.events.map(event => <NotificationEvent />)}
            Open
          </div>
        )}
      </div>
    );
  }
}

EventPanel.propTypes = {
  events: PropTypes.array.isRequired
};
