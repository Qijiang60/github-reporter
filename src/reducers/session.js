import { SET_TOKEN } from '../actions/session';

const session = (state = {}, { type, payload, status }) => {
  if (type === SET_TOKEN) {
    return {
      ...state,
      ...payload,
    };
  }
  return state;
};

export default session;
