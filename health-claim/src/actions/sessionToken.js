import { apiEndpoint } from "../apiEndpoint";

// import { apiEndpoint } from "../apiEndpoint";

export const STORE_TOKEN = "STORE_TOKEN";

export const storeToken = token => ({
  type: STORE_TOKEN,
  payload: { token }
});
