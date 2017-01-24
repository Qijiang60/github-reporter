export const getRequest = endpoint => options => fetch(endpoint, {
  ...options,
}).then(response => response.json());