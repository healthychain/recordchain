export const apiEndpoint =
  (apiEndpoint.includes("localhost")
    ? "http://localhost:"
    : window.location.origin.slice(0, -4)) + "8000";
