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
  <List>
    {repositories(repos, issues)}
  </List>
);

const mapStateToProps = ({ session, issues }) => ({
  repos: session.repos,
  issues,
});

export default connect(mapStateToProps)(Repos);
