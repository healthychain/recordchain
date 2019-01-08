export const apiEndpoint =
  (window.location.origin.includes("localhost")
    ? "http://localhost:"
    : window.location.origin.slice(0, -4)) + "8000";
