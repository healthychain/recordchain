import React, { Component } from "react";
import PropTypes from "prop-types";
import "./PatientView.css";

class PatientView extends Component {
  constructor(props) {
    super(props);

    this.claims = this.claims.bind(this);
    this.patientDetails = this.patientDetails.bind(this);
  }

  claims = patient => {
    fetch("http://51.140.229.104:5000/api/patients-claims/" + patient.id)
      .then(response => response.json())
      .then(data => console.log(data));

    return <div className="patient-view-column">No claims requested</div>;
  };

  patientDetails = patient => {
    //Fetch health record here from ID
    return (
      <div className="patient-view-column">
        {" "}
        <img
          alt="patient"
          className="patient-img"
          src="http://www.rw-designer.com/icon-image/14771-256x256x32.png"
        />
        <h4>Name: {patient.name}</h4>
        <h4>ID: {patient.id}</h4>
        <h4>
          Birthdate:
          {" 23. 4. 1977"}
        </h4>
      </div>
    );
  };

  render = () => (
    <div className="patient-view-container">
      {this.patientDetails(this.props.patient)}
      {this.claims(this.props.patient)}
    </div>
  );
}

PatientView.propTypes = {
  patient: PropTypes.object.isRequired
};

export default PatientView;
