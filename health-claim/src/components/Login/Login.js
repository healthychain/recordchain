import React, { Component } from "react";
import Header from "../Header/Header.js"
import LoginForm from "./LoginForm.js"
import "./Login.css"

export default class Login extends Component {

  handleLogin(loginInfo) {
    const user = loginInfo.user;
    if (!["doctor", "patient", "insuranceCompany"].includes(user)) {
      alert("Invalid user " + user);
      return
    }
    this.props.history.push("/" + user);
  }

  render() {
    return (
      <div>
        <Header />
        <h2 className="welcome-title"> Welcome to Health Claim! </h2>
        <p className="login-text"> Login so you can proceed:</p>
        <LoginForm
          loginHandler={(loginInfo) => { this.handleLogin(loginInfo) }}
        />
      </div>
    );
  }
}
