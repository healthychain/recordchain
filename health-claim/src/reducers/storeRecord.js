import {
    STORE_RECORD_DATA
} from "../actions/storeRecord";

const initialState = {
    data: null
}

const storeRecord = (state = initialState, action) => {
    switch (action.type) {
        case STORE_RECORD_DATA:
            return {
                ...state,
                data: action.payload.data
            };
        default:
            return state;
    }
}

export default storeRecord;