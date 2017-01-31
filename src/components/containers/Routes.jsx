import React from 'react';
import Route from 'react-router-dom/Route';
import Auth from './Auth';
import Main from './Main';
import Token from './Token';
import Repos from '../repos/Repos';
import Settings from '../pages/Settings';

const Routes = () => (
  <div>
    <Route path="/token/:token/:scope" component={Token} exactly />
    <Route path="/auth" exactly component={Auth} />
    <Route path="*" component={Main} />
    <Route path="/" exactly component={Repos} />
    <Route path="/repos" exactly component={Repos} />
    <Route path="/settings" exactly component={Settings} />
  </div>
);

export default Routes;
