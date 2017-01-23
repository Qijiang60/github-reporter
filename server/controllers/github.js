const request = require('request');
const { sendError, githubApi, githubHeaders, sendJsonResponse } = require('./util');
const errorMessage = 'Error retrieving data from GitHub';

const sendApiResponse = res => (error, response, body) => {
  if (error) {
    return sendError({ res, error, message: errorMessage, content: body });
  }
  if (response.statusCode !== 200) {
    return sendError({ res, message: errorMessage, status: response.statusCode, content: body });
  }
  sendJsonResponse({ res, status: 200, content: JSON.parse(body) });
};

const apiRequest = (req, res) => {
  console.log('path', req.path);
  request({
    uri: githubApi(req.path.split('/github/')[1]),
    headers: githubHeaders({ req }),
    method: 'GET',
  }, sendApiResponse(res));
};

module.exports = {
  apiRequest,
};
