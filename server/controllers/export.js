const request = require('request');
const jsonCSV = require('json-csv');
const qs = require('qs');
const moment = require('moment');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { sendJsonResponse, sendError } = require('./util'); 

const { githubHeaders } = require('./util');

const onlyEnabled = fields => fields.filter(({ enabled }) => enabled);

const issuesQuery = ({ state, labels = [], since = {}, assignee }) => {
  const query = {
    state,
    since: moment().subtract(since.quantity, since.unit).format(),
  };
  if (labels.length > 0) { query.labels = labels.join(','); }
  if (assignee) { query.assignee = assignee; }
  return qs.stringify(query);
};

const mapIssues = (user, issues = []) => {
  const { dateFormat, fields } = user.exportSettings;
  const truncateBody = fields.find(({ name }) => name === 'body').truncate;
  const formatDate = date => moment(date).format(dateFormat);
  return issues.map(issue => Object.assign({}, issue, {
    created: formatDate(issue.created_at),
    updated: formatDate(issue.updated_at),
    body: truncateBody ? issue.body.split('\r')[0] : issue.body,
    labels: issue.labels.map(label => label.name).join(', '),
  }));
}

const processIssues = (res, repoName, user) => (error, response, body) => {
  if (!error && response.statusCode < 400) {
    const today = moment().format(user.exportSettings.dateFormat.replace(/\//g, '-'));
    const issues = mapIssues(user, JSON.parse(body));
    const fields = onlyEnabled(user.exportSettings.fields);
    jsonCSV.csvBuffered(issues, { fields }, (err, output) => {
      if (!err) {
        const fileName = `${repoName} export ${today}.csv`
        res.attachment(fileName);
        res.send(output);
      }
      else { console.log('CSV conversion error', err); }
    });
  }
  else { console.log('Request error', error); }
};

const exportIssues = (req, res) => {
  if (!req.query.issuesUrl) {
    return sendJsonResponse({ res, status: 400, content: {
      error: { message: 'Please include an issues URL' } },
    });
  }
  User.findOne({ githubId: req.query.githubId }, (err, user) => {
    if (err) { return sendError({ res, error: err, status: 404 }); }
    const requestOptions = {
      uri: `${req.query.issuesUrl}?${issuesQuery(user.exportSettings.query)}`,
      headers: githubHeaders({ token: `Bearer ${req.query.token}` }),
      method: 'GET',
    };
    request(requestOptions, processIssues(res, req.query.name, user));
  });
}

module.exports = {
  exportIssues
};
