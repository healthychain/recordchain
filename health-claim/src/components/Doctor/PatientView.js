import React, { Component } from "react";
import { Media } from "reactstrap";
import "./PatientView.css";

class PatientView extends Component {
  constructor(props) {
    super(props);

    this.claims = this.claims.bind(this);
    this.patientDetails = this.patientDetails.bind(this);
  }

  claims = patient => {
    //Get possible claims here from ID
    return <div className="patient-view-column">No claims requested</div>;
  };

  patientDetails = patient => {
    //Fetch health record here from ID
    return (
      <div className="patient-view-column">
        {" "}
        <img
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
      {this.claims(null)}
    </div>
  );
}
// } = props => <div>NOTHING YET NI🅱️️️️🅱️A </div>;

export default PatientView;
