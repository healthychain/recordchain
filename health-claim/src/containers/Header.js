import React, { Component } from 'react';
import './Header.css';
import {
  Navbar, Nav, NavItem
} from 'reactstrap';

export default class RecordCard extends Component {
  
  render() {
    return (
      <div>
        <Navbar className={"navbar"} light expand={"md"}>
          <Nav>
            <NavItem> <img src="./icon.png" alt="logo"/></NavItem>
            <NavItem className="header">HEALTH CLAIMS</NavItem>
          </Nav>
        </Navbar>
      </div>
    )
  }
}