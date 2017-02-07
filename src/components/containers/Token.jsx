import React, { Component } from 'react';
import { connect } from 'react-redux';
import Redirect from 'react-router-dom/Redirect';
import selectN from 'selectn';
import { setToken } from '../../actions/session';

const objectify = (str = '') => str.split(',').reduce((acc, item) => ({
  ...acc,
  [item]: true,
}), {});

class Token extends Component {

  componentDidMount() {
    const token = selectN('match.params.token', this.props);
    const scope = selectN('match.params.scope', this.props);
    if (token && scope) {
      this.props.setToken({ token, permissions: objectify(scope) });
    }
  }

  render () {
    return <Redirect to="/" />
  }

}

export default connect(null, { setToken })(Token);
