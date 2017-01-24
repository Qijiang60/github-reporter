import { combineReducers } from 'redux';
import issues from './issues';
import session from './session';

const rootReducer = combineReducers({
  issues,
  session,
});

export default rootReducer;
