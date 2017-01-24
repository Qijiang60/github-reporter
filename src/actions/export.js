import { exportIssuesRequest } from '../api/export';
import { auth } from './util';
export const EXPORT_ISSUES = 'EXPORT_ISSUES';

export const exportIssues = url => (dispatch, getState) => dispatch({
  type: EXPORT_ISSUES,
  promise: exportIssuesRequest(url, auth(getState())),
  manualSuccessDispatch: true,
});
