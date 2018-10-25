import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Doctor from "./components/Doctor/Doctor";
import Claim from "./components/Claim/Claim";
import NotFound from "./components/NotFound/NotFound";
import "./App.css";

export class App extends React.PureComponent {
  render() {
    return (
      <div className="App container">
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/patient" exact component={Claim} />
            <Route path="/doctor" exact component={Doctor} />
            <Route path="/login" exact component={Login} />
            {/* Finally, catch all unmatched routes */}
            <Route component={NotFound} />\
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
