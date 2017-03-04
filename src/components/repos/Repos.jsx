import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import selectN from 'selectn';
import { List } from 'material-ui/List';
import Repo from './Repo';
import Search from './Search';

const filterRepos = filterText => repos => filterText ? repos.filter(({ name = '' } = {}) =>
  name.toLocaleLowerCase().indexOf(filterText) !== -1) : repos;

const mergeIssues = issues => repos => repos.map(repo => ({
  ...repo,
  issues: issues[repo.id] || [],
}));

const sortByIssues = repos => repos.sort((a = {}, b = {}) => b.issues.length - a.issues.length);

const renderRepos = repos => repos.map((repo, i, arr) =>
  <Repo {...repo} key={repo.id} last={arr.length === (i + 1)} />);

const repositories = (filterText, issues) => compose(
  renderRepos,
  sortByIssues,
  mergeIssues(issues),
  filterRepos(filterText)
);

const Repos = ({ repos = [], issues = [], filterText }) => (
  <div>
    <h1 style={{ paddingLeft: '0.5em', paddingRight: '0.5em' }}>
      Respositories <br />
      <small className="small">Click a repository to export issues to CSV</small>
    </h1>
    <Search repos={repos} />
    <List>
      {repositories(filterText, issues)(repos)}
    </List>
  </div>
);

const mapStateToProps = ({ session, issues, form }) => ({
  repos: session.repos,
  issues,
  filterText: selectN('search', getFormValues('search-form')({ form })),
});

export default connect(mapStateToProps)(Repos);
