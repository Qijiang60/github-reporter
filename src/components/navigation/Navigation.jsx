import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import AppBarLink from '../presentation/AppBarLink';

const basic = {
  title: 'Github Reporter',
  showMenuIconButton: false,
};

const Navigation = ({ loggedIn, user = {} }) => {
  if (!loggedIn) {
    return <AppBar {...basic} />;
  }
  return (
    <AppBar {...basic}>
      <AppBarLink to="/reports" label="Reports" />
      <AppBarLink to="/settings" label="Settings" />
      <Avatar src={user.avatar_url} className="app-bar-item" />
    </AppBar>
  );
};

const mapStateToProps = ({ session }) => ({ user: session.user });

export default connect(mapStateToProps)(Navigation);
