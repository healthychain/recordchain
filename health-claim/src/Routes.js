import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import NotFound from "./components/NotFound/NotFound";
import MessageScreen from "./components/MessageScreen/MessageScreen";
import DoctorContainer from "./containers/DoctorContainer";
import PatientContainer from "./containers/PatientContainer";
import LoginFormContainer from "./containers/LoginFormContainer";
import RegisterFormContainer from "./containers/RegisterFormContainer";

class Routes extends Component {
  render() {
    return (
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
        <Route path="/patient" exact component={PatientContainer} />
        <Route path="/doctor" exact component={DoctorContainer} />
        {/* Finally, catch all unmatched routes */}
        <Route component={NotFound} />\
      </Switch>
    );
  }
}

export default Routes;
