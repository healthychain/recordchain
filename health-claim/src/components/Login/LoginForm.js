import React, { Component } from "react";
import Box from "../UI/Containers";
import "./LoginForm.scss";
import { Redirect } from "react-router-dom";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.props.login(
      this.state.username,
      this.state.password,
      this.props.userType.toLowerCase()
    );
    event.stopPropagation();
    event.preventDefault();
  }

  render() {
    const { userType } = this.props;

    if (this.props.loginSuccess) {
      return <Redirect to={`/${userType.toLowerCase()}`} />;
    } else if (this.props.error) {
      return <h1>Error</h1>;
    } else if (this.props.loading) {
      return <h1>Loading</h1>;
    }
    return (
      <div className="Form__Container">
        <h1 className="Page__Title">{`${this.props.userType} Login`}</h1>
        <Box>
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

            <input
              type="submit"
              value="Log in"
              className="Button Button__Green"
            />
          </form>
        </Box>
      </div>
    );
  }
}
