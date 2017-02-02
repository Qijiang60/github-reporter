import React from 'react';
import Route from 'react-router-dom/Route';
import Auth from './Auth';
import Main from './Main';
import Token from './Token';
import Repos from '../repos/Repos';
import Settings from '../settings/Settings';

const Routes = () => (
  <div>
    <Route path="/token/:token/:scope" component={Token} exactly />
    <Route path="/auth" exact component={Auth} />
    <Route path="*" component={Main} />
    <Route path="/" exact component={Repos} />
    <Route path="/repos" exact component={Repos} />
    <Route path="/settings" exact component={Settings} />
  </div>
);

export default Routes;
