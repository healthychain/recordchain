import React, { Component, Fragment } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from "./Routes";
import "./App.css";

const { Issuer } = require('openid-client');
const crypto = require('crypto');
var client_here = undefined;

class App extends Component {
  constructor(props) {

    super(props);

    this.state = {
      isAuthenticated: props.isAuthenticated,
      isAuthenticating: true,
      result: undefined,
      client: undefined,
      callback_url: undefined
    };

  }

  async componentDidMount() {
    this.setState({ isAuthenticating: false });
  }


  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  userHasResult = result => {
    result = JSON.parse(result);
    this.setState({ result: result });
  }

  updateClient = client => {
    this.setState({ client });
  }

  updateCallbackUrl = callback_url => {
    this.setState({ callback_url });
  }

  updateAccess_token = access_token => {
    this.setState({ access_token });
  }

  updateEmail = email => {
    this.setState({ email });
  }

  handleLogout = async event => {
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      result: this.state.result,
      userHasResult: this.userHasResult,
      updateClient: this.updateClient,
      client: this.state.client,
      callback_url: this.state.callback_url,
      updateCallbackUrl: this.updateCallbackUrl,
      access_token: this.state.access_token,
      updateAccess_token: this.updateAccess_token,
      email: this.state.email,
      updateEmail: this.updateEmail
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">OPAL Credit</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <Fragment>
                  <LinkContainer to="/score">
                    <NavItem>Credit Score</NavItem>
                  </LinkContainer>
                  <NavItem onClick={this.handleLogout}>Logout</NavItem>
                </Fragment>
                : <Fragment>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);