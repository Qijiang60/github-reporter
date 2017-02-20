import React, { Component } from 'react';
import { connect } from 'react-redux';
import Redirect from 'react-router-dom/Redirect';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Navigation from '../navigation/Navigation';
import { loggedInSelector } from '../../selectors/session';
import { loadLocalToken } from '../../actions/session';
import githubLogo from '../../images/github-logo-64.png'

const details = 'Customize date format, search filters, column headings and more.'
const authExplanation = "You'll need to connect your GitHub account so we can access your repositories and generate your reports."
const authAssurance = "We'll never use your GitHub account information for anything other than saving your GitHub Reporter settings and exporting GitHub data at your request."

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
        <Navigation />
        <div className="auth">
          <Card className="explanation">
            <CardHeader
              title="Connect Your GitHub Account"
              subtitle="Log in with your GitHub account, then click on a repo to export its issues to CSV."
              avatar={githubLogo}
              style={{ backgroundColor: '#FAFAFA' }}
            />
            <CardText>
              <p>{details}</p>
              <p>{authExplanation}</p>
              <p>{authAssurance}</p>
              <FlatButton href="https://github.com/andy-j-d/github-reporter" label="View Source" />
            </CardText>
          </Card>
          <RaisedButton
            primary
            label="Connect to GitHub"
            href={`${apiRoot}/api/authorize-github`}
            fullWidth
          />
        </div>
      </div>
    );
  }
 
}

export default connect(loggedInSelector, { loadLocalToken })(Auth);
