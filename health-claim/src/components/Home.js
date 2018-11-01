import React, { Component } from "react";
import LinkButton from "./UI/LinkButton";
import Box from "./UI/Containers";
import "./UI/Buttons.scss";

export default class Home extends Component {
  render() {
    return (
      <div className="Home__Container">
        <h3 className="Page__Title">Welcome</h3>
        <Box nopad>
          <div className="Flex__Double">
            <div className="Flex__Half Flex__Grey Flex__Separator">
              <h2 className="Page__Halftitle">Log in</h2>
              <p className="Page__Text">
                If you are a doctor or have already created an account, please
                log in below.
              </p>
              <p>
                <LinkButton to="/login-doctor" className="Button Button__Green">
                  Doctor
                </LinkButton>
                {"     "}
                <LinkButton
                  to="/login-patient"
                  className="Button Button__Green"
                >
                  Patient
                </LinkButton>
              </p>
            </div>
            <div className="Flex__Half">
              <h2 className="Page__Halftitle">Sign up</h2>
              <p className="Page__Text">
                Create your account now to keep your medical records safe.
              </p>
              <p className="Page__Text">
                <LinkButton to="/register" className="Button Button__Secondary">
                  Sign up
                </LinkButton>
              </p>
            </div>
          </div>
        </Box>
      </div>
    );
  }
}
