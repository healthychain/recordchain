import React, { Component } from "react";
// import {
//   ButtonDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem
// } from "reactstrap";
import { Redirect } from "react-router-dom";
import "./Doctor.scss";
// import PatientViewContainer from "../../containers/PatientViewContainer";
import EventPanel from "../EventPanel/EventPanel";
import { apiEndpoint } from "../../apiEndpoint";

class Doctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };

    // this.patientSuggestion = this.patientSuggestion.bind(this);
    // this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  componentDidMount() {
    const { sessionID } = this.props;
    this.props.fetchNotifications(sessionID);
  }

  // patientSuggestion = patient => {
  //   const { name, id } = patient;
  //   return (
  //     <div key={id}>
  //       <DropdownItem
  //         onClick={() => {
  //           this.props.selectPatient({ id, name });
  //         }}
  //       >
  //         {name + " - ID" + id}
  //       </DropdownItem>
  //     </div>
  //   );
  // };

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     this.props.notifications !== nextProps.notifications ||
  //     this.props.loggedIn !== nextProps.loggedIn ||
  //     this.props.id !== nextProps.id ||
  //     this.state.dropdownOpen !== nextState.dropdownOpen
  //   );
  // }

  // toggleDropdown() {
  //   this.setState({
  //     dropdownOpen: !this.state.dropdownOpen
  //   });
  // }

  render() {
    // const mockPatients = [
    //   { name: "John Cena", id: 1 },
    //   { name: "Andrej Kiska", id: 2 },
    //   { name: "Jeorrej Olasxzu", id: 3 }
    // ];

    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="doctor-layout">
        <div className="doctor-main">
          <div className="doctor-inner-alt">
            <div className="Box">
              <label className="Input__Label">Your username</label>
              <input
                onChange={e => this.setState({ username: e.target.value })}
                className="Input__Text"
                type="text"
                value={this.state.username}
              />
              <br /> <label className="Input__Label">Input</label>
              <textarea
                onChange={e => this.setState({ input: e.target.value })}
                className="Input__Area"
                type="text"
                value={this.state.input}
              />
              <hr />
              <button
                onClick={() =>
                  fetch(
                    `${apiEndpoint}/credential_offer?token=${
                      this.props.sessionID
                    }&prover_username=${this.state.username}&data=${
                      this.state.input
                    }`
                  )
                }
                className="Button Button__Green"
              >
                Issue credentials
              </button>
              <button
                onClick={() =>
                  this.props.fetchNotifications(this.props.sessionID)
                }
                className="Button Button__Green"
              >
                Refresh
              </button>
            </div>
            <br />
          </div>
          {/* <div className="doctor-inner">
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
          </div> */}
        </div>
        <EventPanel
          loading={this.props.notificationsLoading}
          error={this.props.notificationsError}
          events={this.props.notifications}
        />
      </div>
    );
  }
}

export default Doctor;
