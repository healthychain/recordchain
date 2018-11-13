import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./components/Home";
import MessageScreen from "./components/MessageScreen/MessageScreen";
import DoctorContainer from "./containers/DoctorContainer";
import PatientContainer from "./containers/PatientContainer";
import LoginFormContainer from "./containers/LoginFormContainer";
import RegisterFormContainer from "./containers/RegisterFormContainer";

class Routes extends Component {
  render() {
    const { loggedIn } = this.props;

    return (
      <Switch>
        <Route path="/welcome" exact component={Home} />
        <Route
          path="/login-doctor"
          exact
          render={props =>
            loggedIn ? (
              <Redirect
                to={{ pathname: "/doctor", state: { from: props.location } }}
              />
            ) : (
              <LoginFormContainer userType="Doctor" />
            )
          }
        />
        <Route
          path="/login-patient"
          exact
          render={props =>
            loggedIn ? (
              <Redirect
                to={{ pathname: "/patient", state: { from: props.location } }}
              />
            ) : (
              <LoginFormContainer userType="Patient" />
            )
          }
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
        <Route
          path="/patient"
          exact
          component={props =>
            loggedIn ? (
              <PatientContainer />
            ) : (
              <Redirect
                to={{
                  pathname: "/login-patient",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
        <Route
          path="/doctor"
          exact
          component={props =>
            loggedIn ? (
              <DoctorContainer />
            ) : (
              <Redirect
                to={{
                  pathname: "/login-doctor",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
        <Redirect to="/welcome" />\
      </Switch>
    );
  }
}

export default Routes;
