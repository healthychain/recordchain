import React from "react";
import "./Header.css";
import { Navbar, Nav, NavItem } from "reactstrap";

const Header = () => (
  <div>
    <Navbar className={"navbar"} light expand={"md"}>
      <Nav>
        <NavItem>
          {" "}
          <img src="./icon.png" alt="logo" />
        </NavItem>
        <NavItem className="header">HEALTH CLAIMS</NavItem>
      </Nav>
    </Navbar>
  </div>
);

export default Header;