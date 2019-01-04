import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Notifications.scss";
import NotificationEventContainer from "../../containers/NotificationEventContainer";

type Props = {
  events: Array<any>,
  loading: Boolean,
  error: Boolean,
  fetchNotifications: Function
};

export default class EventPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { events, loading, error } = this.props;
    return (
      <div className="Notifications__container">
        <div className="Flex__Column">
          <div
            className="Flex__Blue Flex__Centered Flex__Double"
            style={{ padding: "5px 38px" }}
          >
            <h1 className="Page__Title">{`Notifications panel`}</h1>
          </div>
          <div className="Notifications__inner_container">
            {this.props.events.length !== 0 ? (
              this.props.events.map(
                (event, idx) => (
                  console.log(event),
                  <NotificationEventContainer {...event} idx={idx} />
                )
              )
            ) : (
              <p> You currently have no notifications</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
