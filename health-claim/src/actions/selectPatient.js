export const SELECT_PATIENT = "SELECT_PATIENT";

const selectedPatient = ({ id, name, birthDate }) => ({
  type: SELECT_PATIENT,
  payload: { id, name, birthDate }
});

function selectPatient(patient) {
  return dispatch => {
    dispatch(selectedPatient(patient));
  };
}
export default selectPatient;
