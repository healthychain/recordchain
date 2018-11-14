import {
  STORE_TOKEN,
  DELETE_INVALID_TOKEN,
  STORE_DID
} from "../actions/sessionToken";

const initialState = {
  token: null,
  did: null
};

const sessionToken = (state = initialState, action) => {
  switch (action.type) {
    case STORE_TOKEN: {
      return {
        ...state,
        token: action.payload.token
      };
    }
    case STORE_DID: {
      return {
        ...state,
        did: action.payload.did
      };
    }
    case DELETE_INVALID_TOKEN: {
      return {
        token: null,
        did: null
      };
    }
    default:
      return state;
  }
};

export default sessionToken;
