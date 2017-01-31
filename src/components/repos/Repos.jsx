import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Repo from './Repo';

const mergeIssues = (repos, issues) => repos.map(repo => ({
  ...repo,
  issues: issues[repo.id] || [],
}));

const sortByIssues = repos => repos.sort((a = {}, b = {}) => b.issues.length - a.issues.length);

const renderRepos = repos => repos.map(repo => <Repo {...repo} key={repo.id} />);

const repositories = compose(renderRepos, sortByIssues, mergeIssues);

const Repos = ({ repos = [], issues = [] }) => (
  <div className="paper-container">
    {repositories(repos, issues)}
  </div>
);

const mapStateToProps = ({ session, issues }) => ({
  repos: session.repos,
  issues,
});

export default connect(mapStateToProps)(Repos);
