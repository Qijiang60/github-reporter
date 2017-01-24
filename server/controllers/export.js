const request = require('request');
const jsonCSV = require('json-csv');
const moment = require('moment');
const { compose } = require('redux');
const { sendJsonResponse } = require('./util'); 

const { githubHeaders } = require('./util');

const csvFields = [{
  name: 'title',
  label: 'Work Item',
}, {
  name: 'created',
  label: 'Created',
}, {
  name: 'currentStatus',
  label: 'Status',
}, {
  name: 'description',
  label: 'Description',
}];

const today = moment().format('MM-DD-YYYY');
const fileName = `Github Export ${today}.csv`;

const formatDate = date => date && moment(date).format('MM/DD/YYYY');

const truncateDescription = body => body.split('\r')[0];

const mapIssues = (issues = []) => issues.map(issue => {
  issue.created = formatDate(issue['created_at']);
  issue.updated = formatDate(issue['updated_at']);
  issue.currentStatus = issue['closed_at'] ? 'Closed' : 'Open';
  issue.description = truncateDescription(issue.body);
  return issue;
});

const sortByStatus = (issues = []) =>
  issues.sort((a, b) =>
    a && b && b.currentStatus.localeCompare(a.currentStatus));

const processIssues = res => (error, response, body) => {
  if (!error && response.statusCode < 400) {
    const issues = compose(
      sortByStatus,
      mapIssues,
      JSON.parse
    )(body);
    jsonCSV.csvBuffered(issues, {
      fields: csvFields,
    }, (err, output) => {
      if (!err) {
        res.attachment(fileName)
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
    headers: githubHeaders({ req }),
    method: 'GET',
  };
  request(requestOptions, processIssues(res));
}

module.exports = {
  exportIssues
};
