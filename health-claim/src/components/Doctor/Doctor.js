import React, { Component } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./Doctor.css";
import PatientView from "./PatientView";
import Header from "../Header/Header";

export default class Doctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      selectedPatient: null
    };

    this.patientSuggestion = this.patientSuggestion.bind(this);
    this.selectPatient = this.selectPatient.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  patientSuggestion = patient => {
    const { name, id } = patient;
    return (
      <div>
        <DropdownItem
          onClick={() => {
            this.selectPatient(patient);
          }}
        >
          {name + " - ID" + id}
        </DropdownItem>
      </div>
    );
  };

  selectPatient(patient) {
    this.setState({ selectedPatient: patient });
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  async componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    const mockPatients = [
      {
        name: "John Cena",
        id: 10101010101010,
        birthDate: new Date(1977, 23, 4)
      },
      { name: "Andrej Kiska", id: 69696969696969 },
      { name: "Jeorrej Olasxzu", id: 15151515151515 }
    ];

    const { selectedPatient } = this.state;

    return (
      <div>
        <Header />
        <div className="record-select">
          <ButtonDropdown
            className="search-main"
            isOpen={this.state.dropdownOpen}
            toggle={this.toggleDropdown}
          >
            <DropdownToggle block color="primary" className="search-main" caret>
              {selectedPatient ? selectedPatient.name : "Select a patient"}
            </DropdownToggle>
            <DropdownMenu className="search-main">
              {mockPatients.map(this.patientSuggestion)}
            </DropdownMenu>
          </ButtonDropdown>
        </div>
        <div className="patient-display">
          {this.state.selectedPatient ? (
            <PatientView patient={this.state.selectedPatient} />
          ) : (
            <div>No patient selected</div>
          )}
        </div>
      </div>
    );
  }
}
