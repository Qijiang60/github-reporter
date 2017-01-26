import React from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

const exportUrl = (token, issuesUrl, name) =>
  `/api/export/issues/?token=${token}&name=${name}&issuesUrl=${issuesUrl.split('{')[0]}`

const Repo = ({ name, description, url, open_issues, issues = [], issues_url, token }) => (
  <Paper className="paper-item">
  <Card>
    <CardTitle title={name} subtitle={description} />
    <CardText>
      <strong>Repo Data:</strong>
      <div style={{ marginLeft: '1em', marginTop: '1em' }}>
        {open_issues} open issues<br />
        {issues.length} total issues
      </div>
    </CardText>
    <CardActions>
      <FlatButton
        href={exportUrl(token, issues_url, name)}
        disabled={issues.length < 1}
        download
        primary
        label={issues.length > 0 ? 'Export Issues' : 'No Issues to Export'}
      />
    </CardActions>
  </Card></Paper>
);

const mapStateToProps = ({ issues, session }, { id }) => ({
  // TODO: - move this up to Repos so they can be sorted by total issues
  issues: issues[id],
  token: session.token,
});

export default connect(mapStateToProps)(Repo);
