import { STORE_TOKEN } from "../actions/sessionToken";

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
    default:
      return state;
  }
};

export default sessionToken;
