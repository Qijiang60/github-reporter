const getRequest = endpoint => options => fetch(endpoint, {
  ...options,
}).then(response => response.json());

export const getUserRequest = getRequest('/api/github/user');

export const getReposRequest = getRequest('/api/github/user/repos');
