import {
  REGISTER_BEGIN,
  REGISTER_ERROR,
  REGISTER_SUCCESS
} from "../actions/register";

const initialState = {
  success: false,
  loading: false,
  error: null
};

const register = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_BEGIN:
      return { ...state, loading: true, error: null };
    case REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        success: false
      };
    case REGISTER_SUCCESS: {
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

export default register;
