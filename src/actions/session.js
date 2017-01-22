import { getUserRequest } from '../api/session';
import { auth } from './util';

export const SET_TOKEN = 'SET_TOKEN';
export const GET_USER = 'GET_USER';

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

export const getUser = () => (dispatch, getState) => dispatch({
  type: GET_USER,
  promise: getUserRequest(auth(getState())),
});
