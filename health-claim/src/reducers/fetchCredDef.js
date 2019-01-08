import {
  FETCH_CRED_DEF_BEGIN,
  FETCH_CRED_DEF_SUCCESS,
  FETCH_CRED_DEF_ERROR
} from "../actions/fetchCredDef";

const initialState = {
  attrs: [],
  attrNames: [],
  attrs_types: [],
  loading: false,
  error: null
};

const fetchCredDef = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CRED_DEF_BEGIN:
      return { ...state, loading: true, error: null };
    case FETCH_CRED_DEF_ERROR:
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
        attrs: action.payload.attrs,
        attrNames: action.payload.attrs.map(attr => JSON.parse(attr).name)
      };
    }
    default:
      return state;
  }
};

export default fetchCredDef;
