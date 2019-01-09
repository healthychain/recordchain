import {
  FETCH_REQ_STATUS_BEGIN,
  FETCH_REQ_STATUS_SUCCESS,
  FETCH_REQ_STATUS_ERROR
} from "../actions/fetchCredReqStatus";

const initialState = {
  requests: {},
  loading: false,
  error: null
};

const fetchReqStatus = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQ_STATUS_BEGIN:
      return { ...state, loading: true, error: null };
    case FETCH_REQ_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        credentials: []
      };
    case FETCH_REQ_STATUS_SUCCESS: {
      return {
        ...state,
        loading: false,
        requests: action.payload.reqs
      };
    }
    default:
      return state;
  }
};

export default fetchReqStatus;
