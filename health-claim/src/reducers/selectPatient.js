import { SELECT_PATIENT } from "../actions/selectPatient";

const initialState = {
  selectedPatientID: null,
  selectedPatientName: null,
  selectedPatientBirthDate: null
};

const selectPatient = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PATIENT:
      return {
        ...state,
        selectedPatientID: action.payload.id,
        selectedPatientName: action.payload.name,
        selectedPatientBirthDate: action.payload.birthDate
      };
    default:
      return state;
  }
};

export default selectPatient;
