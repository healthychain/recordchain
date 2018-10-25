import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PatientView from "../components/Doctor/PatientView";
import { fetchClaims } from "../actions/fetchPatientClaims";

const mapStateToProps = (state, props) => ({
  ...props,
  selectedPatient: state.selectedPatient,
  claims: state.fetchPatientClaims.claims,
  loading: state.fetchPatientClaims.loading,
  error: state.fetchPatientClaims.error
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  fetchClaims: patientID => dispatch(fetchClaims(patientID))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PatientView)
);
