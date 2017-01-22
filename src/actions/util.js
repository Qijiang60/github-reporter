export const auth = ({ session }) => ({
  headers: { Authorization: `Bearer ${session.token}` },
});
