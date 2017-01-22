import React, { Component } from 'react';
import { connect } from 'react-redux';
import Redirect from 'react-router/Redirect';
import { loggedInSelector } from '../../selectors/session';
import { loadLocalToken } from '../../actions/session';

const apiRoot = process.env.REACT_APP_API_URL || '';

class Auth extends Component {

  componentDidMount() {
    this.props.loadLocalToken();
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <a href={`${apiRoot}/api/authorize-github`}>Authorize</a>
      </div>
    );
  }
 
}

export default connect(loggedInSelector, { loadLocalToken })(Auth);
