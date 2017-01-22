import React from 'react';
import Match from 'react-router/Match';
import Auth from './Auth';
import Main from './Main';
import Token from './Token';

const Routes = () => (
  <div>
    <Match pattern="/token/:token/:scope" component={Token} exactly />
    <Match pattern="/auth" exactly component={Auth} />
    <Match pattern="/" component={Main} />
  </div>
);

export default Routes;
