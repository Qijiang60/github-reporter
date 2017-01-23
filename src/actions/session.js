import { getUserRequest, getReposRequest } from '../api/session';
import { auth } from './util';

export const SET_TOKEN = 'SET_TOKEN';
export const GET_USER = 'GET_USER';
export const GET_REPOS = 'GET_REPOS';
export const LOUGOUT = 'LOGOUT';

export const setToken = payload => dispatch => {
  localStorage.setItem('token', JSON.stringify(payload));
  return dispatch({
    type: SET_TOKEN,
    payload,
  });
};

export const loadLocalToken = () => (dispatch, getState) => {
  if (!getState().session.token) {
    const payload = JSON.parse(localStorage.getItem('token'));
    if (payload && payload.token) {
      dispatch({
        type: SET_TOKEN,
        payload,
      });
    }
  }
};

const apiAction = (type, promiseFn) => () => (dispatch, getState) => dispatch({
  type,
  promise: promiseFn(auth(getState())),
});

export const getUser = apiAction(GET_USER, getUserRequest);

export const getRepos = apiAction(GET_REPOS, getReposRequest);

export const logout = () => dispatch => {
  localStorage.clear();
  return dispatch({
    type: LOUGOUT,
  });
};
