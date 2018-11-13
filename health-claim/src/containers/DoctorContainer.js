import {
  connect
} from "react-redux";
import {
  withRouter
} from "react-router-dom";
import Doctor from "../components/Doctor/Doctor";
import selectPatient from "../actions/selectPatient";
import fetchNotifications from "../actions/fetchNotifications";
import storeRecord from "../actions/storeRecord"
// import fetchPatientInfo from "../actions/fetchPatientInfo";

const mapStateToProps = (state, props) => ({
  ...props,
  id: state.selectPatient.selectedPatientID,
  name: state.selectPatient.selectedPatientName,
  birthDate: state.selectPatient.selectedPatientBirthDate,
  loggedIn: state.login.success,
  sessionID: state.sessionToken.token,
  notificationsLoading: state.fetchNotifications.loading,
  notificationsError: state.fetchNotifications.error,
  notifications: state.fetchNotifications.notifications
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props,
  // fetchPatientInfo: patientID => dispatch(fetchPatientInfo(patientID)),
  storeRecord: data => dispatch(storeRecord(data)),
  selectPatient: ({
      id,
      name,
      birthDate
    }) =>
    dispatch(selectPatient({
      id,
      name,
      birthDate
    })),
  fetchNotifications: sessionID => dispatch(fetchNotifications(sessionID))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Doctor)
);