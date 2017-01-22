import React, { Component } from 'react';
import { connect } from 'react-redux';
import Redirect from 'react-router/Redirect';
import RaisedButton from 'material-ui/RaisedButton';
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
        <RaisedButton primary label="Authorize" href={`${apiRoot}/api/authorize-github`} />
      </div>
    );
  }
 
}

export default connect(loggedInSelector, { loadLocalToken })(Auth);
