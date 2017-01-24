import { getRequest } from './util';

export const getUserRequest = getRequest('/api/github/user');

export const getReposRequest = getRequest('/api/github/user/repos');
