import React, { Component } from 'react';
import { connect } from 'react-redux';
import Redirect from 'react-router/Redirect';
import { loggedInSelector } from '../../selectors/session';
import { loadLocalToken } from '../../actions/session';

class Auth extends Component {

  componentDidMount() {
    this.props.loadLocalToken();
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/" />
    }
    return <div>Auth page</div>
  }
 
}

export default connect(loggedInSelector, { loadLocalToken })(Auth);
