import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import Routes from "./Routes";
import Login from "./containers/Login";
import Doctor from "./containers/Doctor";
import NotFound from "./containers/NotFound";
import './App.css';

export class App extends React.PureComponent {
  render() {
    return (
      <div className="App container">
        <Router>
          <Switch>
            <Route path="/" exact component={Doctor} />
            <Route path="/login" component={Login} />
            { /* Finally, catch all unmatched routes */}
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
