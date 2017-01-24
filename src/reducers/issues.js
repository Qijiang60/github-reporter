import { GET_ISSUES } from '../actions/session';

const issues = (state = {}, { type, status, result, id }) => {
  if (status === 'success' && type === GET_ISSUES) {
    return {
      ...state,
      [id]: result,
    };
  }
  return state;
};

export default issues;
