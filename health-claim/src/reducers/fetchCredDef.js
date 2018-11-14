import {
  FETCH_CRED_DEF_BEGIN,
  FETCH_CRED_DEF_SUCCESS,
  FETCH_CRED_DEF_ERROR
} from "../actions/fetchCredDef";

const initialState = {
  credDef: [],
  loading: false,
  error: null
};

const fetchCredDef = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CRED_DEF_BEGIN:
      return { ...state, loading: true, error: null };
    case FETCH_CRED_DEF_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        credDef: []
      };
    case FETCH_CRED_DEF_SUCCESS: {
      return {
        ...state,
        loading: false,
        credDef: action.payload.notifications
      };
    }
    default:
      return state;
  }
};

export default fetchCredDef;
