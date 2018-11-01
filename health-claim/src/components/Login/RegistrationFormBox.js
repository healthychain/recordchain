import React from "react";
import Box from "../UI/Containers";
import QRReaderButton from "../QRReader/QRReaderButton";
import RoleButton from "./RoleButton";
import "./LoginForm.scss";

export default class RegistrationFormBox extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { isPatient: true };
  }

  toggleRole = isPatient => this.setState(() => ({ isPatient }));

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.props.register(
      this.state.username,
      this.state.password,
      this.state.did,
      this.state.isPatient
    );
    console.log(this.state.username);
    event.stopPropagation();
    event.preventDefault();
  }

  render() {
    const { isPatient } = this.state;
    return (
      <div>
        <h1 className="Page__Title">Sign up</h1>
        <div className="Box Box__NP">
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
                <RoleButton isPatient={isPatient} toggle={this.toggleRole} />
                <hr />
                <input
                  type="submit"
                  value="Sign up"
                  className="Button Button__Green"
                />
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
                    name="did"
                    id="did"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
