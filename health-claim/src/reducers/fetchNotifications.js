import {
  FETCH_NOTIFICATIONS_BEGIN,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_ERROR
} from "../actions/fetchNotifications";

const initialState = {
  claims: [],
  loading: false,
  error: null
};

const fetchNotifications = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_BEGIN:
      return { ...state, loading: true, error: null };
    case FETCH_NOTIFICATIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        notifications: []
      };
    case FETCH_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        notifications: action.payload.notifications
      };
    }
    default:
      return state;
  }
};

export default fetchNotifications;
