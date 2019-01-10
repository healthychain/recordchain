import { SET_PREDS } from "../actions/setPredicates";

const initialState = {
  predicates: null
};

const setPredicates = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case SET_PREDS:
      return {
        ...state,
        predicates: action.payload
      };
    default:
      return state;
  }
};

export default setPredicates;
