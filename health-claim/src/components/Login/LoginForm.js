import React, { Component } from "react";
import Box from "../UI/Containers";
import LoadingScreen from "../Loading/LoadingScreen";
import "./LoginForm.scss";
import { Redirect } from "react-router-dom";

export default class LoginForm extends Component {
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    this.props.login(
      this.state.username,
      this.state.password,
      this.props.userType.toLowerCase()
    );
  };

  render() {
    const { userType } = this.props;

    if (this.props.loginSuccess) {
      return <Redirect to={`/${userType.toLowerCase()}`} />;
    } else if (this.props.loading) {
      return <LoadingScreen />;
    }
    return (
      <div className="Form__Container">
        <div className="Flex__Column">
          <div
            className="Flex__Blue Flex__Centered Flex__Double"
            style={{ padding: "5px 38px" }}
          >
            <h1 className="Page__Title">{`Login as ${this.props.userType}`}</h1>
          </div>
          <div className="Flex__Column Flex__Centered Flex__Double">
            <Box fullwidth>
              <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <label className="Input__Label" htmlFor="username">
                  Your username
                </label>
                <input
                  className="Input__Text"
                  placeholder="Username"
                  type="text"
                  name="username"
                  id="username"
                />
                <br />
                <label className="Input__Label" htmlFor="password">
                  Password
                </label>
                <input
                  placeholder="Password"
                  className="Input__Text"
                  type="password"
                  name="password"
                  id="passowrd"
                />
                <hr />

                <div
                  onClick={() => this.handleSubmit()}
                  value="Log in"
                  className="Button Button__Green"
                >
                  Log in
                </div>
              </form>
            </Box>
          </div>
        </div>
      </div>
    );
  }
}
