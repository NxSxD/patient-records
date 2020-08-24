export function getAPIKey() {
  return fetch("/api/maps-key", {
    method: "GET"
  });
}
