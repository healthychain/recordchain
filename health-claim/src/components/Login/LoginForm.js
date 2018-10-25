import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "../UI/Containers";
import "./LoginForm.scss";

export default class CreateElection extends Component {
  render() {
    return (
      <>
        <h1 className="Page__Title">{`${this.props.userType} Login`}</h1>
        <Box>
          <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <label className="Input__Label" htmlFor="title">
              Your username
            </label>
            <input
              className="Input__Text"
              placeholder="Username"
              type="text"
              name="title"
              id="title"
            />
            <br />
            <label className="Input__Label" htmlFor="description">
              Password
            </label>
            <input
              placeholder="Password"
              className="Input__Text"
              type="text"
              name="description"
              id="description"
            />
            <hr />

            <input
              type="submit"
              value="Submit"
              className="Button Button__Green"
            />
          </form>
        </Box>
      </>
    );
  }
}

CreateElection.propTypes = {
  onSubmit: PropTypes.func
};
