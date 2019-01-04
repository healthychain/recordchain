import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";
import RoutesContainer from "../../RoutesContainer";

import SessionAuthenticator from "../../containers/SessionAuthenticatorContainer";

export class App extends React.PureComponent {
  render() {
    return (
      <SessionAuthenticator>
        <Router>
          <div>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <div className="Header">
              <div className="Header__Upper">
                <div className="Header__Nav">
                  <div className="Header__Layout">
                    <div className="Header__Logo">HealthClaim</div>{" "}
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
                      </div>
                    ]
                  : null}
              </div>
            </div>
            <div className="Body">
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

export default App;
