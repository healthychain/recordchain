import React from "react";
import Box from "../UI/Containers";
import QRReader from "../QRReader/QRReader";
import QRReaderButton from "../QRReader/QRReaderButton";
import "./LoginForm.scss";

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    return (
      <div>
        <h1 className="Page__Title">Sign up</h1>
        <Box>
          <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <div className="Flex__Double">
              <div className="Flex__Half Flex__Grey Flex__Separator">
                {/*<h2 className="Page__Halftitle">Log in</h2>*/}
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
              </div>
              <div className="Flex__Half">
                <h2 className="Page__Halftitle">Doctor approval</h2>
                <p className="Page__Text">
                  Use a doctor DID or their QR code to confirm your signup.
                </p>
                <QRReaderButton />
                <br />
                <div className="Page__Text">
                  <label className="Input__Label" htmlFor="password">
                    Or enter doctor's DID
                  </label>
                  <input
                    placeholder="Doctor DID"
                    className="Input__Text"
                    type="username"
                    name="doctor_did"
                    id="doctor_did"
                  />
                </div>
              </div>
            </div>
            <input
              type="submit"
              value="Sign up"
              className="Button Button__Green"
            />
          </form>
        </Box>
      </div>
    );
  }
}
