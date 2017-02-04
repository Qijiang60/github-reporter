import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import Repo from './Repo';

const mergeIssues = (repos, issues) => repos.map(repo => ({
  ...repo,
  issues: issues[repo.id] || [],
}));

const sortByIssues = repos => repos.sort((a = {}, b = {}) => b.issues.length - a.issues.length);

const renderRepos = repos => repos.map((repo, i, arr) =>
  <Repo {...repo} key={repo.id} last={arr.length === (i + 1)} />);

const repositories = compose(renderRepos, sortByIssues, mergeIssues);

const Repos = ({ repos = [], issues = [] }) => (
  <div>
    <h1 style={{ paddingLeft: '0.5em', paddingRight: '0.5em' }}>
      Respositories <small style={{ color: '#AAA' }}>Click to export CSV</small>
    </h1>
    <List>
      {repositories(repos, issues)}
    </List>
  </div>
);

const mapStateToProps = ({ session, issues }) => ({
  repos: session.repos,
  issues,
});

export default connect(mapStateToProps)(Repos);
