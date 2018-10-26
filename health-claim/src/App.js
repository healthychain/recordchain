import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Claim from "./components/Claim/Claim";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home";
import "./App.scss";
import DoctorContainer from "./containers/DoctorContainer";
import LoginFormContainer from "./containers/LoginFormContainer";
import RegisterFormContainer from "./containers/RegisterFormContainer";

export class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <>
          <div className="Header">
            <div className="Header__Upper">
              <div className="Header__Nav">
                <div className="Header__Logo">HealthClaim</div>
              </div>
            </div>
            <div className="Header__Lower">
              <h2 className="Header__Title">Decentralized Healthcare</h2>
            </div>
          </div>
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
              <Route path="/patient" exact component={Claim} />
              <Route path="/doctor" exact component={DoctorContainer} />
              {/* Finally, catch all unmatched routes */}
              <Route component={NotFound} />\
            </Switch>
          </div>
        </>
      </Router>
    );
  }
}

export default App;
