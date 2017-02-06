import { getRequest } from './util';

export const getUserRequest = getRequest('/api/github/user');

export const getReposRequest = getRequest('/api/github/user/repos');

export const updateSettingsRequest = (payload, options, githubId) =>
  fetch(`/api/user/${githubId}/exportSettings`, {
    method: 'PUT',
    ...options,
    body: JSON.stringify(payload),
  }).then(response => response.json());
