import {
  FETCH_CRED_DEF_BEGIN,
  FETCH_CRED_DEF_SUCCESS,
  FETCH_CRED_DEF_ERROR,
  FETCH_CRED_DEF_TYPES_BEGIN,
  FETCH_CRED_DEF_TYPES_SUCCESS,
  FETCH_CRED_DEF_TYPES_ERROR
} from "../actions/fetchCredDef";

const initialState = {
  attrs: [],
  attrs_types: [],
  loading: false,
  error: null
};

const fetchCredDef = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CRED_DEF_BEGIN:
    case FETCH_CRED_DEF_TYPES_BEGIN:
      return { ...state, loading: true, error: null };
    case FETCH_CRED_DEF_ERROR:
    case FETCH_CRED_DEF_TYPES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        attrs: []
      };
    case FETCH_CRED_DEF_SUCCESS: {
      return {
        ...state,
        loading: false,
        attrs: action.payload.attrs
      };
    }
    case FETCH_CRED_DEF_TYPES_SUCCESS: {
      return {
        ...state,
        loading: false,
        attrs: action.payload.attrs_types
      };
    }
    default:
      return state;
  }
};

export default fetchCredDef;
