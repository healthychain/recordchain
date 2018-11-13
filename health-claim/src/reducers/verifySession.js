import {
  VERIFY_BEGIN,
  VERIFY_SUCCESS,
  VERIFY_ERROR,
  INVALIDATE_SESSION
} from "../actions/verifySession";
import { LOGOUT } from "../actions/login";

const initialState = {
  success: false,
  loading: false
};

const verifySession = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_BEGIN:
      return { ...state, loading: true };
    case VERIFY_ERROR:
    case LOGOUT:
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
    case INVALIDATE_SESSION: {
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
