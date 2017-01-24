import React from 'react';
import { connect } from 'react-redux';
import Repo from './Repo';

const sortByOpenIssues = repos => repos.sort((a = {}, b = {}) => b.open_issues - a.open_issues);

const Repos = ({ repos = [] }) => (
  <div className="paper-container">
    {sortByOpenIssues(repos).map(repo => <Repo {...repo} key={repo.id} />)}
  </div>
);

const mapStateToProps = ({ session }) => ({
  repos: session.repos,
});

export default connect(mapStateToProps)(Repos);
