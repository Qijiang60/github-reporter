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
  request({
    uri: githubApi(req.params.endpoint),
    headers: githubHeaders({ req }),
    method: 'GET',
  }, sendApiResponse(res));
};

module.exports = {
  apiRequest,
};
