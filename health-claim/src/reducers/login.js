import {
  LOGIN_BEGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT
} from "../actions/login";

const initialState = {
  success: false,
  loading: false,
  error: false
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_BEGIN:
      return { ...state, loading: true, error: false };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        success: false
      };
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        token: action.payload.token
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
