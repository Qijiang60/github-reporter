import selectN from 'selectn';
import { getUserRequest, getReposRequest, updateSettingsRequest } from '../api/session';
import { getRequest } from '../api/util';
import { auth } from './util';

export const SET_TOKEN = 'SET_TOKEN';
export const GET_USER = 'GET_USER';
export const GET_REPOS = 'GET_REPOS';
export const GET_ISSUES = 'GET_ISSUES';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const LOUGOUT = 'LOGOUT';

const isValidResponse = response => response && Array.isArray(response) && response.length > 0;

const parseIssuesUrl = (url = '') =>
  `/api/github/${(url.split('.com/')[1]).split('{')[0]}?state=all&filter=all`;

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

export const getRepos = () => (dispatch, getState) => {
  const options = auth(getState());
  dispatch({
    type: GET_REPOS,
    manualSuccessDispatch: true,
    promise: getReposRequest(options)
      .then(response => {
        if (isValidResponse(response)) {
          dispatch({
            type: GET_REPOS,
            status: 'success',
            result: response,
          });
          response.forEach((repo ={}) => 
            repo.issues_url && repo.has_issues && dispatch({
              id: repo.id,
              type: GET_ISSUES,
              promise: getRequest(parseIssuesUrl(repo.issues_url))(options),
            })
          );
        }
      }),
  });
};

export const updateSettings = payload => (dispatch, getState) => {
  const githubId = selectN('session.user.id', getState());
  const options = auth(getState());
  dispatch({
    type: UPDATE_SETTINGS,
    promise: updateSettingsRequest(payload, options, githubId),
  })
}

export const logout = () => dispatch => {
  localStorage.clear();
  return dispatch({
    type: LOUGOUT,
  });
};
