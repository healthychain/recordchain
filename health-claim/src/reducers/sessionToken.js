import { STORE_TOKEN, DELETE_INVALID_TOKEN } from "../actions/sessionToken";

const initialState = {
  token: null
};

const sessionToken = (state = initialState, action) => {
  switch (action.type) {
    case STORE_TOKEN: {
      return {
        ...state,
        token: action.payload.token
      };
    }
    case DELETE_INVALID_TOKEN: {
      return {
        token: null
      };
    }
    default:
      return state;
  }
};

export default sessionToken;
