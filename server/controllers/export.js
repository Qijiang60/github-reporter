const request = require('request');
const jsonCSV = require('json-csv');
const moment = require('moment');
const { compose } = require('redux');
const { sendJsonResponse } = require('./util'); 

const { githubHeaders } = require('./util');

const csvFields = [{
  name: 'title',
  label: 'Title',
}, {
  name: 'number',
  label: 'Issue Number',
}, {
  name: 'created',
  label: 'Created',
}, {
  name: 'updated',
  label: 'Last Updated',
}, {
  name: 'state',
  label: 'State',
}, {
  name: 'description',
  label: 'Description',
}, {
  name: 'labels',
  label: 'Labels',
}, {
  name: 'url',
  label: 'Link',
}];

const today = moment().format('MM-DD-YYYY');

const formatDate = date => date && moment(date).format('MM/DD/YYYY');

const truncateDescription = body => body.split('\r')[0];

const mapIssues = (issues = []) => issues.map(issue => Object.assign(issue, {
  created: formatDate(issue['created_at']),
  updated: formatDate(issue['updated_at']),
  description: truncateDescription(issue.body),
  labels: issue.labels.map(label => label.name).join(', '),
}));

const processIssues = (res, repoName) => (error, response, body) => {
  if (!error && response.statusCode < 400) {
    const issues = compose(
      mapIssues,
      JSON.parse
    )(body);
    jsonCSV.csvBuffered(issues, {
      fields: csvFields,
    }, (err, output) => {
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
  const requestOptions = {
    uri: req.query.issuesUrl,
    headers: githubHeaders({ token: `Bearer ${req.query.token}` }),
    method: 'GET',
  };
  request(requestOptions, processIssues(res, req.query.name));
}

module.exports = {
  exportIssues
};
