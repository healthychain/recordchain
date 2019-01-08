import {
  FETCH_CACHED_CREDS_BEGIN,
  FETCH_CACHED_CREDS_SUCCESS,
  FETCH_CACHED_CREDS_ERROR
} from "../actions/fetchCachedCreds";

const initialState = {
  credentials: [],
  loading: false,
  error: null
};

const fetchCachedCreds = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CACHED_CREDS_BEGIN:
      return { ...state, loading: true, error: null };
    case FETCH_CACHED_CREDS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        credentials: []
      };
    case FETCH_CACHED_CREDS_SUCCESS: {
      return {
        ...state,
        loading: false,
        credentials: action.payload.creds
      };
    }
    default:
      return state;
  }
};

export default fetchCachedCreds;
