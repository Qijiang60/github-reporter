import { SET_TOKEN, GET_USER } from '../actions/session';

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
      }
    }
  }
  return state;
};

export default session;
