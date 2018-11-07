import {
  VERIFY_BEGIN,
  VERIFY_SUCCESS,
  VERIFY_ERROR
} from "../actions/verifySession";

const initialState = {
  success: false,
  loading: false
};

const verifySession = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_BEGIN:
      return { ...state, loading: true };
    case VERIFY_ERROR:
      return {
        ...state,
        loading: false,
        success: false
      };
    case VERIFY_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true
      };
    }
    default:
      return state;
  }
};

export default verifySession;
