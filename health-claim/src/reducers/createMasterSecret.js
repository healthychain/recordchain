import {
  CREATE_MASTER_SECRET_BEGIN,
  CREATE_MASTER_SECRET_SUCCESS,
  CREATE_MASTER_SECRET_ERROR
} from "../actions/createMasterSecret";

import { HANDLE_NOTIFICATION } from "../actions/handleNotification";

const initialState = {
  notifications: [],
  loading: false,
  error: null
};

const createMasterSecret = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MASTER_SECRET_BEGIN:
      return { ...state, loading: true, error: null };
    case CREATE_MASTER_SECRET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case CREATE_MASTER_SECRET_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null
      };
    }
    default:
      return state;
  }
};

export default createMasterSecret;
