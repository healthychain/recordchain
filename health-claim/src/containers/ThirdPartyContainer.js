import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ThirdParty from "../components/ThirdParty/ThirdParty";

const mapStateToProps = (state, props) => ({
  ...props
  //   id: state.selectPatient.selectedPatientID,
  //   name: state.selectPatient.selectedPatientName,
  //   birthDate: state.selectPatient.selectedPatientBirthDate,
  //   loggedIn: state.login.success,
  //   sessionID: state.sessionToken.token,
  //   notificationsLoading: state.fetchNotifications.loading,
  //   notificationsError: state.fetchNotifications.error,
  //   notifications: state.fetchNotifications.notifications,
  //   credDef: state.fetchCredDef.attrs,
  //   did: state.sessionToken.did
});

const mapDispatchToProps = (dispatch, props) => ({
  ...props
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ThirdParty)
);
