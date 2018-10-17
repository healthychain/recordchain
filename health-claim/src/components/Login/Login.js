import React, { Component } from "react";
import LoaderButton from "../LoaderButton/LoaderButton";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "no email found yet",
      access_token: "no token found yet",
      callback_url: props.callback_url
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  //Function called by the login button that updates the app state to loading
  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <LoaderButton
            block
            bsSize="large"
            type="submit"
            isLoading={this.state.isLoading}
            text="Login using OpenID"
            loadingText="Logging in…"
            href={this.state.callback_url}
          />
        </form>
      </div>
    );
  }
}
