import { LOGOUT_BEGIN, LOGOUT_ERROR, LOGOUT_SUCCESS } from "../actions/logout";

const initialState = {
  success: false,
  loading: false
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_BEGIN:
      return { ...state, loading: true, error: false };
    case LOGOUT_ERROR:
      return {
        ...state,
        loading: false,
        success: false
      };
    case LOGOUT_SUCCESS: {
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

export default login;
