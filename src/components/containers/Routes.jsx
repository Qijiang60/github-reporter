import React from 'react';
import Match from 'react-router/Match';
import Auth from './Auth';
import Main from './Main';
import Token from './Token';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';

const Routes = () => (
  <div>
    <Match pattern="/token/:token/:scope" component={Token} exactly />
    <Match pattern="/auth" exactly component={Auth} />
    <Match pattern="/" component={Main} />
    <Match pattern="/reports" exactly component={Reports} />
    <Match pattern="/settings" exactly component={Settings} />
  </div>
);

export default Routes;
