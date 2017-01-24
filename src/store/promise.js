const promiseMiddleware = ({ dispatch, getState }) => next => action => {
  const { promise, manualSuccessDispatch, ...rest } = action;
  if (!promise) {
    return next(action);
  }
  next({ ...rest, status: 'send-request' });
  return promise.then(
    (result = {}) => {
      if (result.error) {
        return next({ ...rest, result, error: result.error, status: 'failure' });
      } else if (!manualSuccessDispatch) {
        return next({ ...rest, result, status: 'success' });
      }
    },
    error => next({ ...rest, error, status: 'failure' })
  );
};

export default promiseMiddleware;
