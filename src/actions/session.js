export const SET_TOKEN = 'SET_TOKEN';

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
