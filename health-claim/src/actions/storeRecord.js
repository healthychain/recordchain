export const STORE_RECORD_DATA = "STORE_RECORD_DATA";

export const storeRecordData = data => ({
  type: STORE_RECORD_DATA,
  payload: { data }
});

function storeRecord(data) {
  return dispatch => {
    dispatch(storeRecordData(data));
  };
}

export default storeRecord;
