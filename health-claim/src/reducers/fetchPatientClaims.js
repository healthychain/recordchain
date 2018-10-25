import {
  FETCH_CLAIMS_BEGIN,
  FETCH_CLAIMS_ERROR,
  FETCH_CLAIMS_SUCCESS
} from "../actions/fetchPatientClaims";

const initialState = {
  claims: [],
  loading: false,
  error: null
};

const fetchPatientClaims = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLAIMS_BEGIN:
      return { ...state, loading: true, error: null };
    case FETCH_CLAIMS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        claims: []
      };
    case FETCH_CLAIMS_SUCCESS: {
      return {
        ...state,
        loading: false,
        claims: action.payload.claims
      };
    }
    default:
      return state;
  }
};

export default fetchPatientClaims;
