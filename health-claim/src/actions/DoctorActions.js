export const SELECT_PATIENT = "SELECT_PATIENT";

export const getPatient = patientID => ({
  type: SELECT_PATIENT,
  patientID
});
