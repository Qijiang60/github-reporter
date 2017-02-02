import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import issues from './issues';
import session from './session';

const rootReducer = combineReducers({
  issues,
  form,
  session,
});

export default rootReducer;
