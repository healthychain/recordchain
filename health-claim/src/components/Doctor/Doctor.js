import React, { Component } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Redirect } from "react-router-dom";
import "./Doctor.scss";
import PatientViewContainer from "../../containers/PatientViewContainer";
import EventPanel from "../EventPanel/EventPanel";

class Doctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };

    this.patientSuggestion = this.patientSuggestion.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  patientSuggestion = patient => {
    const { name, id } = patient;
    return (
      <div key={id}>
        <DropdownItem
          onClick={() => {
            this.props.selectPatient({ id, name });
          }}
        >
          {name + " - ID" + id}
        </DropdownItem>
      </div>
    );
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.loggedIn !== nextProps.loggedIn ||
      this.props.id !== nextProps.id ||
      this.state.dropdownOpen !== nextState.dropdownOpen
    );
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const mockPatients = [
      { name: "John Cena", id: 1 },
      { name: "Andrej Kiska", id: 2 },
      { name: "Jeorrej Olasxzu", id: 3 }
    ];

    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="doctor-layout">
        <div className="doctor-main">
          <div className="record-select">
            <ButtonDropdown
              isOpen={this.state.dropdownOpen}
              toggle={this.toggleDropdown}
              onClick={() => this.toggleDropdown()}
            >
              <DropdownToggle
                block
                caret
                className="search-button bg-search-button"
              >
                {this.props.name || "Select a patient"}
              </DropdownToggle>
              <DropdownMenu className="bg-search-button">
                {mockPatients.map(this.patientSuggestion)}
              </DropdownMenu>
            </ButtonDropdown>
          </div>
          <div className="patient-display">
            {this.props.id ? (
              <PatientViewContainer
                name={this.props.name}
                id={this.props.id}
                birthDate={this.props.birthDate}
              />
            ) : (
              <div>No patient selected</div>
            )}
          </div>
        </div>
        <EventPanel
          events={this.props.fetchNotifications(this.props.sessionID)}
        />
      </div>
    );
  }
}

export default Doctor;
