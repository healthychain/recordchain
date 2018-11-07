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
                <h2 className="Header__Title">Decentralized Healthcare</h2>
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
