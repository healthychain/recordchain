import React, { Component } from "react";
import Box from "../UI/Containers";
import QRReader from "../QRReader/QRReader";
import { Button } from "react-bootstrap";
import RegistrationForm from "./RegistrationForm";
import "./LoginForm.scss";
import { Redirect } from "react-router-dom";

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = { render: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(compName, e) {
    console.log(compName);
    this.setState({ render: compName });
  }

  _renderSubComp() {
    switch (this.state.render) {
      case "QRReader":
        return <QRReader />;
    }
  }

  render() {
    if (this.props.loginSuccess) {
      return <Redirect to="/register-success" />;
    } else if (this.props.error) {
      return <Redirect to="/register-failure" />;
    } else if (this.props.loading) {
      return <h1>Loading</h1>;
    }
    return <RegistrationForm />;
  }
}
