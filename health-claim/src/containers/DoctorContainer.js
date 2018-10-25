import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Doctor from "../components/Doctor/Doctor";
import selectPatient from "../actions/selectPatient";
// import fetchPatientInfo from "../actions/fetchPatientInfo";

const mapStateToProps = (state, props) => ({
  ...props,
  id: state.selectPatient.selectedPatientID,
  name: state.selectPatient.selectedPatientName,
  birthDate: state.selectPatient.selectedPatientBirthDate
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  // fetchPatientInfo: patientID => dispatch(fetchPatientInfo(patientID)),
  selectPatient: ({ id, name, birthDate }) =>
    dispatch(selectPatient({ id, name, birthDate }))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Doctor)
);
