import {
  TP_REQUEST_BEGIN,
  TP_REQUEST_SUCCESS,
  TP_REQUEST_ERROR,
  TP_VIEW_BEGIN,
  TP_VIEW_SUCCESS,
  TP_VIEW_ERROR
} from "../actions/thirdPartyCalls";

const initialState = {
  proof: null,
  loading: false,
  error: null
};

const thirdPartyCalls = (state = initialState, action) => {
  switch (action.type) {
    case TP_REQUEST_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case TP_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case TP_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: null
      };
    case TP_VIEW_BEGIN:
      return {
        ...state,
        loading: false,
        error: null
      };
    case TP_VIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        proof: action.payload.proof
      };

    case TP_VIEW_ERROR:
      return {
        ...state,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

export default thirdPartyCalls;
