export const auth = ({ session }) => ({
  headers: { 
    Authorization: `Bearer ${session.token}`,
    'Content-Type': 'application/json',
  },
});
