import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import classNames from "classnames";
import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";
import RoutesContainer from "../../RoutesContainer";

import SessionAuthenticator from "../../containers/SessionAuthenticatorContainer";

type Props = {
  loggedIn: Boolean,
  notificationsNumber: Number
};

export class App extends React.PureComponent<Props> {
  render() {
    const str = this.props.userType === "doctor" ? "Doctor" : "Patient";
    const { loggedIn, notificationsNumber } = this.props;
    return (
      <SessionAuthenticator>
        <Router>
          <div className="Wrapper">
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <div className="Header">
              <div className="Header__Upper">
                <div className="Header__Nav">
                  <div className="Header__Layout">
                    <div className="Header__Logo">HealthClaim</div>
                    <div className="Header__Logo">{str}</div>{" "}
                    {this.props.loggedIn ? (
                      <div className="Header__Link">
                        <Link to="/" onClick={() => this.props.logout()}>
                          Logout
                        </Link>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="Header__Lower">
                <h2 className="Header__Title">
                  <Link style={{ textDecoration: "none" }} to="/dashboard">
                    Decentralized Healthcare
                  </Link>
                </h2>
                {this.props.loggedIn
                  ? [
                      <div className="Header__Link" key="1">
                        <Link className="Header__Link__text" to="/dashboard">
                          Dashboard
                        </Link>
                      </div>,
                      <div className="Header__Link" key="2">
                        <Link className="Header__Link__text" to="/settings">
                          Settings
                        </Link>
                      </div>,
                      <div className="Header__Link" key="3">
                        <Link
                          className="Header__Link__text"
                          to="/notifications"
                        >
                          {`Notifications (${notificationsNumber})`}
                        </Link>
                      </div>
                    ]
                  : null}
              </div>
            </div>
            <div
              className={classNames("Body", {
                ["Body__notcentered"]: loggedIn
              })}
            >
              <video
                className={classNames("video_background", {
                  ["video__dark"]: loggedIn
                })}
                autoPlay
                muted
                id="video1"
                loop
              >
                <source
                  src="https://media.giphy.com/media/5QYmwnydFO8MNqhJOb/giphy.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="Main">
                <Route component={RoutesContainer} />
              </div>
            </div>
          </div>
        </Router>
      </SessionAuthenticator>
    );
  }
}

export default withRouter(App);
