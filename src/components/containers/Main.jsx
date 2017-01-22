import React, { Component } from 'react';
import { connect } from 'react-redux';
import Redirect from 'react-router/Redirect';
import { loggedInSelector } from '../../selectors/session';

class Main extends Component {

  componentDidMount() {
    // get user meta from github
    // get user repos from github
    // get user settings from local DB
  }
 
  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/auth" />;
    }
    return <div>Main page</div>;
  }

}

export default connect(loggedInSelector)(Main);
