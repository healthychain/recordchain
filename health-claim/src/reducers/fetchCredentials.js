import {
  FETCH_CRED_BEGIN,
  FETCH_CRED_SUCCESS,
  FETCH_CRED_ERROR
} from "../actions/fetchCredentials";

const initialState = {
  credentials: [],
  loading: false,
  error: null
};

const fetchCreds = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CRED_BEGIN:
      return { ...state, loading: true, error: null };
    case FETCH_CRED_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        credentials: []
      };
    case FETCH_CRED_SUCCESS: {
      return {
        ...state,
        loading: false,
        credentials: action.payload.credentials
      };
    }
    default:
      return state;
  }
};

export default fetchCreds;
