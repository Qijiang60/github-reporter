import React, { Component } from 'react';
import { connect } from 'react-redux';
import Redirect from 'react-router/Redirect';
import { loggedInSelector } from '../../selectors/session';
import { getUser } from '../../actions/session';

class Main extends Component {

  componentDidMount() {
    this.getUser(this.props);
    // get user repos from github
    // get user settings from local DB
  }

  componentWillReceiveProps(newProps) {
    this.getUser(newProps);
  }

  getUser = props => {
    if (props.loggedIn && !props.userFetched) {
      props.getUser();
    }
  }
 
  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/auth" />;
    }
    return <div>Main page</div>;
  }

}

export default connect(loggedInSelector, { getUser })(Main);
