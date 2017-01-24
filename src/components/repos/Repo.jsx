import React from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { exportIssues } from '../../actions/export';

const Repo = ({ name, description, url, open_issues, issues = [], exportAction, issues_url }) => (
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
        primary
        label="Export Issues"
        onClick={() => exportAction(`${issues_url.split('{')[0]}?state=all`)}
      />
    </CardActions>
  </Card></Paper>
);

const mapStateToProps = ({ issues }, { id }) => ({
  issues: issues[id],
});

export default connect(mapStateToProps, { exportAction: exportIssues })(Repo);
