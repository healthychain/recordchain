import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Routes from "./Routes";
import logo from './logo.svg';
import './App.css';

class App extends React.PureComponent {
  render() {
    return (
      <Routes />
    );
  }
}

export default withRouter(App);
