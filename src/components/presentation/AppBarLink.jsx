import React from 'react';
import Link from 'react-router/Link';
import FlatButton from 'material-ui/FlatButton';

const activeStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
}

const AppBarLink = ({ to, label, linkProps = {}, buttonProps = {} }) => (
  <Link to={to} className="app-bar-item app-bar-link" {...linkProps} activeStyle={activeStyle}>
    <FlatButton label={label} labelStyle={{ color: 'white' }} {...buttonProps} />
  </Link>
);

export default AppBarLink;
