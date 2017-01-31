import React from 'react';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import Warning from 'material-ui/svg-icons/alert/warning';

const appendUrl = issuesUrl => `issuesUrl=${issuesUrl.split('{')[0]}`;

const exportUrl = (token, issuesUrl, name, githubId) =>
  `/api/export/issues/?token=${token}&name=${name}&githubId=${githubId}&${appendUrl(issuesUrl)}`;

  const displayIssues = (num, open) =>
    `${num} ${open ? 'open' : 'total'} issue${num === 1 ? '' : 's'}`

const Repo =
  ({ name, description, url, open_issues, issues = [], issues_url, token, githubId, last }) => (
    <div>
      <ListItem 
        primaryText={name}
        secondaryText={<span>
          <p>{description}</p>
          {displayIssues(open_issues, true)}, {displayIssues(issues.length)}
        </span>}
        rightIcon={issues.length > 0 ? <FileDownload /> : <Warning color="#CCC" />}
        href={exportUrl(token, issues_url, name, githubId)}
        download
        disabled={issues.length < 1}
      />
      {!last && <Divider />}
    </div>
  );

const mapStateToProps = ({ session }) => ({
  token: session.token,
  githubId: session.user.id,
});

export default connect(mapStateToProps)(Repo);
