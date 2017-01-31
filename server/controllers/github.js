const request = require('request');
const qs = require('qs');
const { sendError, githubApi, githubHeaders, sendJsonResponse } = require('./util');
const { getUser } = require('./user');
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
  const endpoint = req.path.split('/github/')[1];
  const query = Object.values(req.query).length > 0 ? `?${qs.stringify(req.query)}` : '';
  const requestOptions = {
    uri: githubApi(`${endpoint}${query}`),
    headers: githubHeaders({ req }),
    method: 'GET',
  };
  request(requestOptions, sendApiResponse(res));
};

const getGithubUser = (req, res) => {
  request({
    uri: githubApi('user'),
    headers: githubHeaders({ req }),
    method: 'GET',
  }, (error, response, body) => {
    if (error) {
      return sendError({ res, error, message: errorMessage, content: body });
    }
    if (response.statusCode !== 200) {
      return sendError({ res, message: errorMessage, status: response.statusCode, content: body });
    }
    const githubUser = JSON.parse(body);
    const getUserCallback = user => sendJsonResponse({
      res,
      status: 200,
      content: Object.assign({}, githubUser, { local: user }),
    });
    return getUser(githubUser.id, getUserCallback);
  })
}

module.exports = {
  apiRequest,
  getGithubUser,
};
