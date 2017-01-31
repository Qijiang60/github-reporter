import React, { Component } from 'react';
import { connect } from 'react-redux';
import Redirect from 'react-router-dom/Redirect';
import Navigation from '../navigation/Navigation';
import { loggedInSelector } from '../../selectors/session';
import { getUser, getRepos } from '../../actions/session';

class Main extends Component {

  state = {
    userFetched: false,
  }

  componentDidMount() {
    this.getUser(this.props);
    // get user repos from github
    // get user settings from local DB
  }

  componentWillReceiveProps(newProps) {
    this.getUser(newProps);
  }

  getUser = props => {
    if (props.loggedIn && !props.userFetched && !this.state.userFetched) {
      props.getUser();
      props.getRepos();
      this.setState({
        userFetched: true,
      });
    }
  }
 
  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/auth" />;
    }
    return (
      <Navigation loggedIn />
    );
  }

}

export default connect(loggedInSelector, { getUser, getRepos })(Main);
