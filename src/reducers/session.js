import { SET_TOKEN, GET_USER, GET_REPOS } from '../actions/session';

const session = (state = {}, { type, payload, status, result }) => {
  if (type === SET_TOKEN) {
    return {
      ...state,
      ...payload,
    };
  }
  if (status === 'success') { // handle successful API responses
    if (type === GET_USER) {
      return {
        ...state,
        user: result,
      };
    }
    if (type === GET_REPOS) {
      return {
        ...state,
        repos: result,
      };
    }
  }
  return state;
};

export default session;
