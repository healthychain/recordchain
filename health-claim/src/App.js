import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Routes from "./Routes";
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <Routes />
    );
  }
}

export default withRouter(App);
