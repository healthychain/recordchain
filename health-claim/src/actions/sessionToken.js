import { apiEndpoint } from "../apiEndpoint";

// import { apiEndpoint } from "../apiEndpoint";

export const STORE_TOKEN = "STORE_TOKEN";
export const STORE_DID = "STORE_DID";
export const STORE_ACCOUNT_TYPE = "STORE_ACCOUNT_TYPE";
export const DELETE_INVALID_TOKEN = "DELETE_INVALID_TOKEN";

export const storeToken = token => ({
  type: STORE_TOKEN,
  payload: { token }
});

export const storeDid = did => ({
  type: STORE_DID,
  payload: { did }
});

export const storeAccountType = accountType => ({
  type: STORE_ACCOUNT_TYPE,
  payload: { accountType }
});

export const deleteInvalidToken = () => ({
  type: DELETE_INVALID_TOKEN
});
