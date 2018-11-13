import React, { Component } from "react";
import "./Claim.css";
import {
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import RecordCard from "../RecordCard/RecordCard";
import Header from "../Header/Header";
import "bootstrap/dist/css/bootstrap.css";

export default class Claim extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelected: false,
      dropdownOpen: false
    };

    this.claimSuggestion = this.claimSuggestion.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  handleClick(index) {
    this.setState({ selectedCardIndex: index });
  }

  renderRecords(records) {
    return (
      <div className="health-records">
        {records.map((record, index) => {
          const isCardSelected = this.state.selectedCardIndex === index;
          return (
            <div key={record.title}>
              <RecordCard
                record={record}
                onClick={() => this.handleClick(index)}
                isSelected={isCardSelected}
              />
            </div>
          );
        })}
      </div>
    );
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  claimSuggestion = claim => {
    return (
      <div>
        <DropdownItem onClick={() => {}}>{claim}</DropdownItem>
      </div>
    );
  };

  render() {
    const healthRecord1 = {
      title: "Health record 1",
      description: "Issued by doctor Smith"
    };
    const healthRecord2 = {
      title: "Health record 2",
      description: "Issued by doctor Ben"
    };
    const healthRecord3 = {
      title: "Health record 3",
      description: "Issued by doctor Michael"
    };

    const records = [healthRecord1, healthRecord2, healthRecord3];

    const claims = ["Age", "Hearth", "Height"];

    return (
      <div>
        <div>
          <Header />
        </div>
        <div className="record-select">
          <h4 className="record-text">Choose one of your health records:</h4>
          {this.renderRecords(records)}
          <div className="records-button">
            <Button color="link">See older health records</Button>
          </div>
        </div>
        <h5 className="record">
          {" "}
          Record number {this.state.selectedCardIndex}{" "}
        </h5>
        <div className="bar"> </div>
        <div className="make-claim">
          Make a claim about your record
          <ButtonDropdown
            className="search"
            isOpen={this.state.dropdownOpen}
            toggle={this.toggleDropdown}
            onClick={() => this.toggleDropdown()}
          >
            <DropdownToggle color="primary">
              {this.props.claim ? this.props.claim : "Select a claim type"}
            </DropdownToggle>
            <DropdownMenu>{claims.map(this.claimSuggestion)}</DropdownMenu>
          </ButtonDropdown>
          <Button className="claim-button">Post claim</Button>
        </div>
      </div>
    );
  }
}
