import { combineReducers } from 'redux';
import example from './example';
import session from './session';

const rootReducer = combineReducers({
  example,
  session,
});

export default rootReducer;
