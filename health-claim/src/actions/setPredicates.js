export const SET_PREDS = "SET_PIERDS";

const sutPredicates = predicates => ({
  type: SET_PREDS,
  payload: predicates
});

function setPredicates(prd) {
  return dispatch => {
    dispatch(sutPredicates(prd));
  };
}
export default setPredicates;
