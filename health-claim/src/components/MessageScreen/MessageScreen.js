import React, { Component } from "react";
import "./MessageScreen.scss";
import "../Core/App.scss";
import { Redirect } from "react-router-dom";
import LinkButton from "../UI/LinkButton";

export default class SuccessPage extends Component {
  render() {
    return (
      <>
        {this.redirect ? (
          <Redirect to="login-doctor" />
        ) : (
          <div className="FeedbackWrapper">
            <div className="FeedbackAlert Feedback--Green">
              {this.props.success ? (
                <div className="FA__Tick" />
              ) : (
                <div className="FA__Error" />
              )}
              <h1 className="FA__Title">{this.props.title}</h1>
              <p className="FA__Text">{this.props.text}</p>
              <p className="FA__Centered">
                <LinkButton
                  to={this.props.redirect}
                  className={
                    this.props.success
                      ? "Button Button__Green"
                      : "Button Button__Red"
                  }
                >
                  {this.props.buttonText}
                </LinkButton>
              </p>
            </div>
          </div>
        )}
      </>
    );
  }
}
