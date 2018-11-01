import React, { Component } from "react";
import QRReader from "../QRReader/QRReader";
import RegistrationFormBox from "./RegistrationFormBox";
import "./LoginForm.scss";
import { Redirect } from "react-router-dom";

const RegisterForm = props => {
  const { loginSuccess, error, loading } = props;
  if (loginSuccess) {
    return <Redirect to="/register-success" />;
  } else if (error) {
    return <Redirect to="/register-failure" />;
  } else if (loading) {
    return <h1>Loading</h1>;
  }
  return <RegistrationFormBox {...props} />;
};

export default RegisterForm;
