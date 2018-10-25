import React, { Component } from "react";
import PropTypes from "prop-types";
import "./PatientView.css";

class PatientView extends Component {
  componentDidMount() {
    console.log("Did mount");
    const { id } = this.props;
    this.props.fetchClaims(id);
  }

  componentWillReceiveProps(newProps) {
    const { id } = this.props;
    const newId = newProps.id;

    if (newId !== id) {
      this.props.fetchClaims(newId);
    }
  }

  render = () => {
    return (
      <div className="patient-view-container">
        {this.props.loading ? (
          <p>Loading</p>
        ) : (
          <div>
            <div className="patient-view-column">
              {" "}
              <img
                alt="patient"
                className="patient-img"
                src="http://www.rw-designer.com/icon-image/14771-256x256x32.png"
              />
              <h4>Name: {this.props.name}</h4>
              <h4>ID: {this.props.id}</h4>
              <h4>
                Birthdate:
                {" 23. 4. 1977"}
              </h4>
            </div>
            <div className="patient-view-column">
              {this.props.claims.map(
                claim => (console.log(claim), <p>{claim.title}</p>)
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
}

PatientView.propTypes = {
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  birthDate: PropTypes.instanceOf(Date).isRequired,
  claims: PropTypes.array
};

PatientView.defaultProps = {
  claims: []
};

export default PatientView;
