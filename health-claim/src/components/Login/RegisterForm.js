import React, { Component } from "react";
import QRReader from "../QRReader/QRReader";
import RegistrationFormBox from "./RegistrationFormBox";
import "./LoginForm.scss";
import { Redirect } from "react-router-dom";

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.props.register(this.state.username, this.state.password);
    console.log(this.state.username);
    event.stopPropagation();
    event.preventDefault();
  }

  render() {
    if (this.props.loginSuccess) {
      return <Redirect to="/register-success" />;
    } else if (this.props.error) {
      return <Redirect to="/register-failure" />;
    } else if (this.props.loading) {
      return <h1>Loading</h1>;
    }
    return <RegistrationFormBox />;
  }
}
