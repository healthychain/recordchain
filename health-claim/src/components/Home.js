import React, { Component } from "react";
import LinkButton from "./UI/LinkButton";
import Counter from "./Counter/Counter";
import Box from "./UI/Containers";
import "./UI/Buttons.scss";

export default class Home extends Component {
  render() {
    return (
      <div className="Home__Container">
        <Box nopad>
          <div className="Flex__Column">
            <div className="Flex__Double">
              <div className="Flex__Half Flex__Grey Flex__Separator">
                <h2 className="Page__Halftitle">Log In</h2>
                <p className="Page__Text">
                  To access your medical records safely.
                </p>
                <p>
                  <LinkButton
                    to="/login-doctor"
                    className="Button Button__Green"
                  >
                    Doctor
                  </LinkButton>
                  {"     "}
                  <LinkButton
                    to="/login-patient"
                    className="Button Button__Green"
                  >
                    Patient
                  </LinkButton>
                  {"     "}
                  <LinkButton
                    to="/login-thirdparty"
                    className="Button Button__Green"
                  >
                    3rd Party
                  </LinkButton>
                </p>
              </div>
              <div className="Flex__Half">
                <h2 className="Page__Halftitle">Sign Up</h2>
                <p className="Page__Text">Keep your medical records safe.</p>
                <p className="Page__Text">
                  <LinkButton
                    to="/register"
                    className="Button Button__Secondary"
                  >
                    Sign up
                  </LinkButton>
                </p>
              </div>
            </div>
            <div
              className="Flex__Blue Flex__Double Flex__Column"
              style={{ padding: "20px" }}
            >
              <div className="Flex__Column Centered">
                <h2
                  className="Page__Halftitle Page__medium__text"
                  style={{ marginBottom: "10px" }}
                >
                  {"Join over"}
                </h2>
                <Counter
                  currentValue={1345230}
                  previousValue={0}
                  duration={4}
                />
                <h2
                  className="Page__Halftitle Page__medium__text"
                  style={{ marginTop: "10px" }}
                >
                  {"people who trusted HealthClaim"}
                </h2>
              </div>
            </div>
            <div
              className="Flex__DarkBlue Flex__Double Flex__Column"
              style={{ padding: "20px" }}
            >
              <div className="Flex__Column Centered">
                <h2
                  className="Page__Halftitle Page__medium__text"
                  style={{ marginBottom: "10px" }}
                >
                  {"Official partner of: "}
                  <img
                    src={
                      "https://www.giantitab.com/wp-content/uploads/2017/09/nhs-logo.png"
                    }
                    height={40}
                  />
                </h2>
              </div>
            </div>
          </div>
        </Box>
      </div>
    );
  }
}
