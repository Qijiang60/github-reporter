import selectN from 'selectn';

export const loggedInSelector = ({ session }) => ({
  loggedIn: !!(session.token && selectN('permissions.repo', session)),
  userFetched: !!(selectN('user.id', session)),
});
