import React from 'react';
import Match from 'react-router/Match';
import Auth from './Auth';
import Main from './Main';
import Token from './Token';
import Repos from '../repos/Repos';
import Settings from '../pages/Settings';

const Routes = () => (
  <div>
    <Match pattern="/token/:token/:scope" component={Token} exactly />
    <Match pattern="/auth" exactly component={Auth} />
    <Match pattern="*" component={Main} />
    <Match pattern="/" exactly component={Repos} />
    <Match pattern="/repos" exactly component={Repos} />
    <Match pattern="/settings" exactly component={Settings} />
  </div>
);

export default Routes;
