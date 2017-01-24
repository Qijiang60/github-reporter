import React from 'react';
import AppBar from 'material-ui/AppBar';
import AppBarLink from '../presentation/AppBarLink';
import AccountMenu from './AccountMenu';

const basic = {
  title: 'Github Reporter',
  showMenuIconButton: false,
};

const Navigation = ({ loggedIn }) => {
  if (!loggedIn) {
    return <AppBar {...basic} />;
  }
  return (
    <AppBar {...basic}>
      <AppBarLink to="/repos" label="Repos" />
      <AppBarLink to="/settings" label="Settings" />
      <AccountMenu />
    </AppBar>
  );
};

export default Navigation;
