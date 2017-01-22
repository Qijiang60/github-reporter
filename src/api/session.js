export const getUserRequest = options => fetch('/api/github/user', {
  ...options,
}).then(response => response.json());
