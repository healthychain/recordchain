import {
  LOGIN_BEGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT
} from "../actions/login";

const initialState = {
  success: false,
  loading: false,
  error: null
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_BEGIN:
      return { ...state, loading: true, error: null };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        success: false
      };
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        token: action.payload.response
      };
    }
    case LOGOUT: {
      return {
        ...state,
        loading: false,
        success: false
      };
    }
    default:
      return state;
  }
};

export default login;
