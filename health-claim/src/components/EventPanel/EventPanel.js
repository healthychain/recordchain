import React, { Component } from "react";
import PropTypes from "prop-types";

import "./EventPanel.scss";
import NotificationEventContainer from "../../containers/NotificationEventContainer";

export default class EventPanel extends Component {
  constructor(props) {
    super(props);

    this.state = { collapsed: true };

    this.toggleView = this.toggleView.bind(this);
  }

  toggleView() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    if (this.props.loading) {
      // return <div>Loading</div>;
    } else if (this.props.error) {
      return <div>Error</div>;
    }
    return (
      <div>
        <div
          onClick={this.toggleView}
          className={
            this.props.events.length === 0
              ? "ToggleButton"
              : "ToggleButton__Selected"
          }
        >
          <i className="fa fa-bell" />
        </div>
        {this.state.collapsed ? (
          <div className="Toggle" onClick={this.toggleView}>
            <div
              className={
                this.props.events.length === 0 ? null : "NotificationLight"
              }
            />
          </div>
        ) : (
          <div className="EventPanel">
            <div className="Toggle__Open" onClick={this.toggleView}>
              Minimize
            </div>
            {this.props.events &&
              this.props.events.map((event, idx) => (
                <NotificationEventContainer {...event} idx={idx} />
              ))}
          </div>
        )}
      </div>
    );
  }
}

EventPanel.propTypes = {
  events: PropTypes.array.isRequired
};
