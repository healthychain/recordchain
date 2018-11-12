import { apiEndpoint } from "../apiEndpoint";

// import { apiEndpoint } from "../apiEndpoint";

export const STORE_TOKEN = "STORE_TOKEN";
export const DELETE_INVALID_TOKEN = "DELETE_INVALID_TOKEN";

export const storeToken = token => ({
  type: STORE_TOKEN,
  payload: { token }
});

export const deleteInvalidToken = () => ({
  type: DELETE_INVALID_TOKEN
});
