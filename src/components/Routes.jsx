import React from 'react';
import Match from 'react-router/Match';
import Container from './Container';
import Token from './Token';

const Routes = () => (
  <div>
    <Match pattern="/" component={Container} exactly />
    <Match pattern="/token/:token/:scope" component={Token} exactly />
  </div>
);

export default Routes;
