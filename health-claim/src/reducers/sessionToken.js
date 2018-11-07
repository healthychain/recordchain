import { STORE_TOKEN } from "../actions/sessionToken";

const initialState = {
  token: null
};

const sessionToken = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_BEGIN:
      return { ...state, loading: true, error: null };
    case STORE_TOKEN: {
      return {
        ...state,
        token: action.payload.token
      };
    }
    default:
      return state;
  }
};
