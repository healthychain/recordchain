import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Claim from "../Claim/Claim";
import NotFound from "../NotFound/NotFound";
import Home from "../Home";
import "./App.scss";
import DoctorContainer from "../../containers/DoctorContainer";
import LoginFormContainer from "../../containers/LoginFormContainer";
import RegisterFormContainer from "../../containers/RegisterFormContainer";
import MessageScreen from "../MessageScreen/MessageScreen";

export class App extends React.PureComponent {
  shouldComponentUpdate(newProps) {
    return this.props !== newProps;
  }

  render() {
    return (
      <Router>
        <>
          <div className="Header">
            <div className="Header__Upper">
              <div className="Header__Nav">
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
            <div className="Header__Lower">
              <h2 className="Header__Title">Decentralized Healthcare</h2>
            </div>
          </div>
          <div className="Body">
            <div className="Main">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route
                  path="/login-doctor"
                  exact
                  render={() => <LoginFormContainer userType="Doctor" />}
                />
                <Route
                  path="/login-patient"
                  exact
                  render={() => <LoginFormContainer userType="Patient" />}
                />
                <Route
                  path="/register"
                  exact
                  render={() => <RegisterFormContainer />}
                />
                <Route
                  path="/register-success"
                  exact
                  render={() => (
                    <MessageScreen
                      success
                      redirect="/login-doctor"
                      title="You're all set!"
                      text="You have successfully registered."
                      buttonText="Log in"
                    />
                  )}
                />
                <Route
                  path="/register-failure"
                  exact
                  render={() => (
                    <MessageScreen
                      redirect="/"
                      title="Something went wrong"
                      text="Please try again"
                      buttonText="Home"
                    />
                  )}
                />
                <Route path="/patient" exact component={Claim} />
                <Route path="/doctor" exact component={DoctorContainer} />
                {/* Finally, catch all unmatched routes */}
                <Route component={NotFound} />\
              </Switch>
            </div>
          </div>
        </>
      </Router>
    );
  }
}

export default App;
