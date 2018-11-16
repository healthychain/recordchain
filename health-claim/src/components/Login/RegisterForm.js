import React from "react";
import RegistrationFormBox from "./RegistrationFormBox";
import "./LoginForm.scss";
import { Redirect } from "react-router-dom";

const RegisterForm = props => {
  const { loginSuccess, error, loading } = props;
  if (loginSuccess) {
    return <Redirect to="/" />;
  }
  if (loading) {
    return <h1>Loading</h1>;
  }
  return <RegistrationFormBox {...props} />;
};

export default RegisterForm;
